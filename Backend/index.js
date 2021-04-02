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
const path = require('path');

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

const multer = require('multer');
const fs = require('fs');
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
  }).single('myImage');
  app.use(express.static('./public'));
  
// var connection = mysql.createConnection({
var connection = mysql.createPool({
    host: constants.DB.host,
    user: constants.DB.username,
    password: constants.DB.password,
    port: constants.DB.port,
    database: constants.DB.database,
    // connectionLimit:500
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
// app.get('/', function (req, res) {
//     console.log("hello splitwise");
// });

//Route to handle Post Request Call
app.post('/login', async function (req, res) {
    if (req.body.email && req.body.password) {
        await connection.query(`select * from user_profile_table where UPPER(email) = '${req.body.email.toUpperCase()}'`, (err, result) => {
            if (err) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                });
                res.send("Database Error");
            } else {
                if (result[0] && passwordHash.verify(req.body.password, result[0]['password'])) {
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    const userObj = {
                        id: result[0]['rec_id'],
                        email: result[0]['email'],
                        name: result[0]['name'],
                        profilePicture: result[0]['profile_picture_url'],
                        phone: result[0]['phone'],
                        currency: result[0]['currency'],
                        timezone: result[0]['timezone'],
                        language: result[0]['language']
                    }
                    res.end(JSON.stringify(userObj));
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Unsuccessful Login");
                }
            }
        });
    }
});


app.post('/signup', async function (req, res) {
    if (req.body.name && req.body.email && req.body.password) {
        var sql = `INSERT INTO user_profile_table (email, name, password) VALUES ('${req.body.email.toUpperCase()}', '${req.body.name}', '${passwordHash.generate(req.body.password)}');`;
        await connection.query(sql, async function (error, results) {
            if (error) {
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end(error.code);
            } else {
                await connection.query(`SELECT * from user_profile_table where UPPER(email)='${req.body.email.toUpperCase()}'`, function (error, result) {
                    if (error) {
                        res.writeHead(500, {
                            'Content-Type': 'text/plain'
                        });
                        res.send("Database Error");
                    } else {
                        const userObj = {
                            id: result[0]['rec_id'],
                            email: result[0]['email'],
                            name: result[0]['name'],
                            profilePicture: result[0]['profile_picture_url'],
                            phone: result[0]['phone'],
                            currency: result[0]['currency'],
                            timezone: result[0]['timezone'],
                            language: result[0]['language']
                        }
                        res.end(JSON.stringify(userObj));
                    }
                });
            }
        });
    }
});



app.get('/fetchUsers', async function (req, res) {
    var sql = `SELECT rec_id, LOWER(email) as email, LOWER(name) as name from user_profile_table;`;
    await connection.query(sql, function (error, result) {
        // console.log("query executed successfully", sql, result);
        if (error) {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end("error occured.");
        }
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end(JSON.stringify(result));
    });
});

app.post('/fetchGroups', async function (req, res) {
    var sql = `SELECT * FROM user_group_table AS UGT JOIN group_info_table AS GIT ON GIT.rec_id = UGT.group_id WHERE user_id=${req.body.user_id}`;
    await connection.query(sql, function (error, result) {
        // console.log("query executed successfully", sql, result);
        if (error) {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end("error occured.");
        }
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end(JSON.stringify(result));
    });
});

app.post('/newGroup', async function (req, res) {
    var sql = `INSERT into group_info_table (name, admin_email, profile_picture_url) VALUES('${req.body.groupName}','${req.body.email}','${req.body.profilePicture}')`;
    await connection.query(sql, function (error, result) {
        if (error) {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end(error.code);
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            if (req.body.userIDArray && result.affectedRows == 1) {
                req.body.userIDArray.forEach(user => {
                    var tempSql = `INSERT into user_group_table (user_id,group_id,isAccepted) VALUES('${user}','${result.insertId}','${user == req.body.user_rec_id ? 1 : 0}')`;
                    connection.query(tempSql, function (err, res) {
                        // console.log("Inner query executed successfully", tempSql, res, err);
                    });
                });
            }
            res.end(JSON.stringify(result));
        }
    });
});

app.post('/acceptInvite', async function (req, res) {
    var sql = `UPDATE user_group_table set isAccepted = ${req.body.isAccepted} where user_id = '${req.body.user_id}' AND group_id='${req.body.group_id}'`;
    await connection.query(sql, function (error, result) {
        if (error) {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end(error.code);
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end(JSON.stringify(result));
        }
    });
});

app.post('/addExpense', async function (req, res) {
    if (req.body.group_id && req.body.description && req.body.amount && req.body.paid_by) {
        // TODO check error
        var groupSQL = `SELECT user_id FROM user_group_table where group_id = '${req.body.group_id}' and isAccepted=1`;
        await connection.query(groupSQL, function (error, result) {
            if (error) {
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end(error.code);
            } else {
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                if (result.length>0) {
                    var splitAmount = (req.body.amount/result.length).toFixed(2);
                    var unevenSplit = (req.body.amount - (result.length-1)*splitAmount).toFixed(2);
                    result.forEach((user,index) => {
                        var tempSql = `INSERT into expenses_table (group_id, description, paid_by, paid_to, amount, settled) VALUES(${req.body.group_id},'${req.body.description}',${req.body.paid_by},${user.user_id},'${index==result.length-1?unevenSplit:splitAmount}','N')`;
                        connection.query(tempSql, function (err, res) {
                            // console.log("Inner query executed successfully", tempSql, res, err);
                        });
                    });
                }
                res.end(JSON.stringify(result));
            }
        });
    }
});


app.post('/getAllExpenses', async function (req, res) {
    var sql = `SELECT e.group_id,e.description,e.paid_by,e.paid_to,SUM(e.amount) as amount,e.settled,u.name AS paid_to_name,uu.name AS paid_by_name,e.created_date FROM expenses_table AS e INNER JOIN  user_profile_table AS u ON u.rec_id = e.paid_to INNER JOIN user_profile_table AS uu ON uu.rec_id = e.paid_by WHERE group_id='${req.body.group_id}' and e.settled='N' GROUP BY e.description ORDER BY e.rec_id desc`;
    await connection.query(sql, function (error, result) {
        if (error) {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end(error.code);
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end(JSON.stringify(result));
        }
    });
});

app.post('/getAllIndividualExpenses', async function (req, res) {
    var sql = `SELECT e.group_id,e.paid_to,u.name,e.settled,e.amount,e.created_date FROM expenses_table AS e INNER JOIN user_profile_table AS u ON e.paid_to=u.rec_id WHERE group_id='${req.body.group_id}' and e.settled='N'`;
    await connection.query(sql, function (error, result) {
        if (error) {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end(error.code);
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end(JSON.stringify(result));
        }
    });
});

app.post('/getAllUserExpenses', async function (req, res) {
    var sql = `SELECT e.group_id,e.description,e.paid_by,e.paid_to,u.name,e.settled,e.amount,e.created_date FROM expenses_table AS e INNER JOIN user_profile_table AS u ON e.paid_to=u.rec_id WHERE group_id in (SELECT group_id from user_group_table where user_id = '${req.body.user_id}')  and e.settled='N' order by e.created_date desc`;
    await connection.query(sql, function (error, result) {
        if (error) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            });
            res.end(error.code);
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end(JSON.stringify(result));
        }
    });
});


app.post('/settleUp', async function (req, res) {
    var sql = `UPDATE expenses_table SET settled='Y', updated_date=NOW() WHERE (paid_by=${req.body.paid_by} and paid_to=${req.body.paid_to}) or (paid_by=${req.body.paid_to} and paid_to=${req.body.paid_by})`;
    await connection.query(sql, function (error, result) {
        if (error) {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end(error.code);
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end(JSON.stringify(result));
        }
    });
});

app.post('/updateUserProfile', async function (req, res) {
    var sql = `UPDATE user_profile_table SET email='${req.body.email.toUpperCase()}', name='${req.body.name}', phone='${req.body.phone}', currency='${req.body.currency}', timezone='${req.body.timezone}', language='${req.body.language}',profile_picture_url='${req.body.profilePicture}' WHERE  rec_id=${req.body.id}`;
    await connection.query(sql, function (error, result) {
        if (error) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            });
            res.end(error.code);
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end(JSON.stringify(result));
        }
    });
});


app.post('/getAllUserExpensesForRecentActivities', async function (req, res) {
    var sql = `SELECT e.group_id,g.name as group_name,e.description,e.paid_by,e.paid_to,u.name,e.settled,SUM(e.amount) as amount,e.created_date, e.updated_date FROM expenses_table AS e INNER JOIN user_profile_table AS u ON e.paid_by=u.rec_id INNER JOIN group_info_table as g ON g.rec_id=e.group_id WHERE group_id in (SELECT group_id from user_group_table where user_id = '${req.body.user_id}') group by e.description order by e.updated_date desc, e.created_date desc`;
    await connection.query(sql, function (error, result) {
        if (error) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            });
            res.end(error.code);
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end(JSON.stringify(result));
        }
    });
});


app.post('/getGroupMembers', async function (req, res) {
    // console.log(req.body);
    var sql = `SELECT DISTINCT u.user_id,p.name as name,p.email as email FROM user_group_table AS u INNER JOIN user_profile_table AS p ON p.rec_id=u.user_id WHERE u.group_id='${req.body.group_id}'`;
    await connection.query(sql, function (error, result) {
        // console.log(error,result);
        if (error) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            });
            res.end(error.code);
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end(JSON.stringify(result));
        }
    });
});


app.post('/updateGroup', async function (req, res) {
    console.log(req.body);
    var sql = `UPDATE group_info_table SET name='${req.body.name}' WHERE rec_id='${req.body.group_id}'`;
    await connection.query(sql, function (error, result) {
        console.log(sql,result,error);
        console.log(error,result);
        if (error) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            });
            res.end(error.code);
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end(JSON.stringify(result));
        }
    });
});


app.post('/exitGroup', async function (req, res) {
    console.log(req.body);
    var sql = `DELETE from user_group_table where user_id='${req.body.user_id}' and group_id='${req.body.group_id}'`;
    await connection.query(sql, function (error, result) {
        console.log(sql,result,error);
        console.log(error,result);
        if (error) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            });
            res.end(error.code);
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end(JSON.stringify(result));
        }
    });
});

app.post('/uploadUserProfilePicture', (req, res) => {
    upload(req, res, async (err) => {
      if(err){
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        })
        res.end("error");
      } else {
        if(req.file == undefined){
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end("no file");
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end(req.file.filename);
        }
      }
    });
  });

  app.get('/user/:id',(req,res)=>{
      var image = path.join(__dirname)+'/public/uploads/'+req.params.id;
      if(fs.existsSync(image)){
          res.sendFile(image);
      }
      else{
          res.sendFile(path.join(__dirname) + '/public/uploads/defaultProfilePicture.png')
      }
  });


//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");

module.exports = app;
