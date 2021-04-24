//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
app.set('view engine', 'ejs');
const UserProfile = require('../kafka-backend/mongo/models/user_profile')
const Group = require('../kafka-backend/mongo/models/group')
const Expenses = require('../kafka-backend/mongo/models/expenses')
var ObjectID = require('mongodb').ObjectID;
const passwordHash = require('password-hash');
const path = require('path');

var kafka = require('./kafka/client');
const jwt = require('jsonwebtoken')
const config = require('./config');
const { auth, checkAuth } = require('./passport');
auth();

//use cors to allow cross origin resource sharing
app.use(cors({ origin: config.frontEnd, credentials: true }));

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
  res.setHeader('Access-Control-Allow-Origin', config.frontEnd);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

const db = config.mongoURI;
const mongoose = require('mongoose');

mongoose.createConnection(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  poolSize: 4
}).then((err, result) => {
  console.log("connected!!!");
});


app.get("/", (req, res) => {
});


app.post('/signup', async function (req, res) {
  kafka.make_request('signup', req.body, function (err, results) {


    if (err) {

      res.json({
        status: "error",
        msg: "System Error, Try Again."
      })
    } else {

      res.json(results);
      res.end();
    }
  });
});


app.post('/login', async function (req, res) {

  kafka.make_request('login', req.body, function (err, results) {


    if (err) {

      res.json({
        status: "error",
        msg: "System Error, Try Again."
      })
    } else {

      res.json(results);
      res.end();
    }
  });

});


app.get('/fetchUsers', checkAuth, async function (req, res) {
  console.log("fetch users");
  kafka.make_request('fetchUsers', req.body, function (err, results) {


    if (err) {

      res.json({
        status: "error",
        msg: "System Error, Try Again."
      })
    } else {

      res.json(results);
      res.end();
    }

  });


});


app.post('/newGroup', checkAuth, async function (req, res) {
  kafka.make_request('newGroup', req.body, function (err, results) {


    if (err) {

      res.json({
        status: "error",
        msg: "System Error, Try Again."
      })
    } else {

      res.json(results);
      res.end();
    }
  });
});


app.post('/fetchGroups', checkAuth, async function (req, res) {
  // console.log(req.body);
  kafka.make_request('fetchGroups', req.body, function (err, results) {


    if (err) {

      res.json({
        status: "error",
        msg: "System Error, Try Again."
      })
    } else {

      res.json(results);
      res.end();
    }
  });
});

app.post('/acceptInvite', checkAuth, async function (req, res) {
  kafka.make_request('acceptInvite', req.body, function (err, results) {


    if (err) {

      res.json({
        status: "error",
        msg: "System Error, Try Again."
      })
    } else {

      res.json(results);
      res.end();
    }
  });
});

app.post('/addExpense', checkAuth, async function (req, res) {
  kafka.make_request('addExpense', req.body, function (err, results) {

    console.log("REQUEST FOR ADD EXPENSE",req.body);
    if (err) {

      res.json({
        status: "error",
        msg: "System Error, Try Again."
      })
    } else {

      res.json(results);
      res.end();
    }
  });
});


app.post('/getAllExpenses', checkAuth, async function (req, res) {
  kafka.make_request('getAllExpenses', req.body, function (err, results) {


    if (err) {

      res.json({
        status: "error",
        msg: "System Error, Try Again."
      })
    } else {

      res.json(results);
      res.end();
    }
  });
});

app.post('/getAllIndividualExpenses', checkAuth, async function (req, res) {
  kafka.make_request('getAllIndividualExpenses', req.body, function (err, results) {


    if (err) {

      res.json({
        status: "error",
        msg: "System Error, Try Again."
      })
    } else {

      res.json(results);
      res.end();
    }
  });
});

app.post('/getAllUserExpenses', checkAuth, async function (req, res) {
  kafka.make_request('getAllUserExpenses', req.body, function (err, results) {


    if (err) {

      res.json({
        status: "error",
        msg: "System Error, Try Again."
      })
    } else {

      res.json(results);
      res.end();
    }
  });
});


app.post('/settleUp', checkAuth, async function (req, res) {
  kafka.make_request('settleUp', req.body, function (err, results) {


    if (err) {

      res.json({
        status: "error",
        msg: "System Error, Try Again."
      })
    } else {

      res.json(results);
      res.end();
    }
  });
});

app.post('/updateUserProfile', checkAuth, async function (req, res) {
  console.log("INSIDE USERPROFILE UPDATION");
  kafka.make_request('updateUserProfile', req.body, function (err, results) {


    if (err) {

      res.json({
        status: "error",
        msg: "System Error, Try Again."
      })
    } else {

      res.json(results);
      res.end();
    }
  });
});


app.post('/getAllUserExpensesForRecentActivities', checkAuth, async function (req, res) {
  kafka.make_request('getAllUserExpensesForRecentActivities', req.body, function (err, results) {


    if (err) {

      res.json({
        status: "error",
        msg: "System Error, Try Again."
      })
    } else {

      res.json(results);
      res.end();
    }
  });

});


// app.post('/getGroupMembers', checkAuth, async function (req, res) {
//   // console.log(req.body);
//   var sql = `SELECT DISTINCT u.user_id,p.name as name,p.email as email FROM user_group_table AS u INNER JOIN user_profile_table AS p ON p.rec_id=u.user_id WHERE u.group_id='${req.body.group_id}'`;
//   await connection.query(sql, function (error, result) {
//       // console.log(error,result);
//       if (error) {
//           res.writeHead(400, {
//               'Content-Type': 'text/plain'
//           });
//           res.end(error.code);
//       } else {
//           res.writeHead(200, {
//               'Content-Type': 'text/plain'
//           });
//           res.end(JSON.stringify(result));
//       }
//   });
// });


// app.post('/updateGroup', checkAuth, async function (req, res) {
//   console.log(req.body);
//   var sql = `UPDATE group_info_table SET name='${req.body.name}' WHERE rec_id='${req.body.group_id}'`;
//   await connection.query(sql, function (error, result) {
//       console.log(sql,result,error);
//       console.log(error,result);
//       if (error) {
//           res.writeHead(400, {
//               'Content-Type': 'text/plain'
//           });
//           res.end(error.code);
//       } else {
//           res.writeHead(200, {
//               'Content-Type': 'text/plain'
//           });
//           res.end(JSON.stringify(result));
//       }
//   });
// });


app.post('/exitGroup', checkAuth, async function (req, res) {
  kafka.make_request('exitGroup', req.body, function (err, results) {


    if (err) {

      res.json({
        status: "error",
        msg: "System Error, Try Again."
      })
    } else {

      res.json(results);
      res.end();
    }
  });
});

// app.post('/uploadUserProfilePicture', (req, res) => {
//   upload(req, res, async (err) => {
//     if(err){
//       res.writeHead(200, {
//           'Content-Type': 'text/plain'
//       })
//       res.end("error");
//     } else {
//       if(req.file == undefined){
//           res.writeHead(200, {
//               'Content-Type': 'text/plain'
//           })
//           res.end("no file");
//       } else {
//           res.writeHead(200, {
//               'Content-Type': 'text/plain'
//           })
//           res.end(req.file.filename);
//       }
//     }
//   });
// });

// app.get('/user/:id',(req,res)=>{
//     var image = path.join(__dirname)+'/public/uploads/'+req.params.id;
//     if(fs.existsSync(image)){
//         res.sendFile(image);
//     }
//     else{
//         res.sendFile(path.join(__dirname) + '/public/uploads/defaultProfilePicture.png')
//     }
// });


app.post('/postComment', checkAuth, async function (req, res) {
  kafka.make_request('postComment', req.body, function (err, results) {

    console.log("REQUEST FOR ADD COMMENT",req.body,"COMMENT ADDED...");
    console.log(results.notes);
    if (err) {

      res.json({
        status: "error",
        msg: "System Error, Try Again."
      })
    } else {

      res.json(results);
      res.end();
    }
  });
});

app.post('/deleteComment', checkAuth, async function (req, res) {
  kafka.make_request('deleteComment', req.body, function (err, results) {


    if (err) {

      res.json({
        status: "error",
        msg: "System Error, Try Again."
      })
    } else {

      res.json(results);
      res.end();
    }
  });
});

//start your server on port 3002
app.listen(3002);
console.log("Server Listening on port 3002");

module.exports = app;