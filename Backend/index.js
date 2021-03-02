//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var mysql = require('mysql');
app.set('view engine', 'ejs');
var constants = require("./config.json");
const passwordHash = require('password-hash');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret: 'cmpe273_splitwise',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

// var connection = mysql.createConnection({
var connection = mysql.createPool({
    host: constants.DB.host,
    user: constants.DB.username,
    password: constants.DB.password,
    port: constants.DB.port,
    database: constants.DB.database
});
// connection.connect(function(err){
//     if(err) throw err;
//     console.log("Connected to DB!");
// });
connection.getConnection((err) => {
    if (err) {
        throw 'Error occured: ' + err;
    }
    console.log("pool created");
});

//Route to handle Post Request Call
app.get('/', function (req, res) {
    console.log("hello splitwise");
});

//Route to handle Post Request Call
app.post('/login', async function (req, res) {
    if (req.body.email && req.body.password) {
        console.log(`select rec_id, password from user_profile_table where UPPER(email) = '${req.body.email.toUpperCase()}' 
        AND password = '${passwordHash.generate(req.body.password)}'`);
        await connection.query(`select rec_id, password from user_profile_table where UPPER(email) = '${req.body.email.toUpperCase()}'`, (err, result) => {
            console.log("XXXXXXXX", err, result);
            if (err) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                });
                res.send("Database Error");
            } else {
                if (passwordHash.verify(req.body.password, result[0]['password'])) {
                    console.log("match");
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Successful Login");
                } else {
                    console.log("dont match");
                    res.writeHead(401, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Unscuccessful Login");
                }
            }
        });
    }
});


app.post('/signup', async function (req, res) {
    console.log("inside signup");
    console.log(req.body);
    if (req.body.name && req.body.email && req.body.password) {
        var sql = `INSERT INTO user_profile_table (email, name, password) VALUES ('${req.body.email.toUpperCase()}', '${req.body.name}', '${passwordHash.generate(req.body.password)}');`;
        await connection.query(sql, function (error, results) {
            console.log("query executed successfully", sql, results);
            if (error) {
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end("error occured.");
            }
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end("User added successfully!");
        });
    }
});


//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");
