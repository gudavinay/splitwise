//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
app.set('view engine', 'ejs');
const UserProfile = require('./models/user_profile')
const Group = require('./models/group')
const Expenses = require('./models/expenses')
var ObjectID = require('mongodb').ObjectID;
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

const config = require('./config');
const db = config.mongoURI;
const mongoose = require('mongoose');

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
var connection = mongoose.connection;
// console.log('MongoDB Connected !!');

app.get("/", (req, res) => {
  // const UserProfileModel = mongoose.model('UserProfile', require('./models/user_profile'));
  // console.log(connection.modelNames());
  // console.log("********************************************");
  // var user = {
  //   name: 'abc',
  //   _id: new ObjectID()
  // };
  // connection.model('UserProfile').insertOne(user).then(() => {
  //   console.log("Data inserted successfully");
  // })
  //   .catch(e => {
  //     console.log(e);
  //   })
  const up = new UserProfile({ email: 'vinay@gmail.com' });
  up.save();
  // UserProfile.save(function (err, book) {
  //   if (err) return console.error(err);
  //   console.log(book.name + " saved to bookstore collection.");
  // });
  // console.log(connection.collection('UserProfile').find());
  res.send("Hello World");
});


app.post('/signup', async function (req, res) {
  const data = {
    email: req.body.email.toUpperCase(),
    name: req.body.name,
    password: passwordHash.generate(req.body.password)
  };
  const up = new UserProfile(data);
  await up.save(function (err, result) {
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.end(JSON.stringify(err ? "ER_DUP_ENTRY" : result))
  });
});


app.post('/login', async function (req, res) {
  await UserProfile.findOne({ email: req.body.email.toUpperCase() }, function (err, result) {
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.end(JSON.stringify(err ? err : (result && result['password'] && passwordHash.verify(req.body.password, result['password'])) ? result : "Unsuccessful Login"))
  });
});


app.get('/fetchUsers', async function (req, res) {
  await UserProfile.find(function (err, result) {
    // console.log(result);
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.end(JSON.stringify(err ? err : result).toLocaleLowerCase());
  });
});


app.post('/newGroup', async function (req, res) {
  var users = [];
  req.body.userIDArray.forEach(user => {
    const userData = {
      user_id: user,
      isAccepted: user == req.body.user_rec_id ? 1 : 0
    };
    users.push(userData);
  });
  const data = {
    name: req.body.groupName,
    admin_email: req.body.email,
    profile_picture_url: req.body.profilePicture,
    user: users
  };
  const group = new Group(data);
  await group.save(function (err, result) {
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    if (err) { res.end(JSON.stringify(err)); }
    res.end(JSON.stringify(err ? "ER_DUP_ENTRY" : result));
  });
});


app.post('/fetchGroups', async function (req, res) {
  // console.log(req.body);
  await Group.find({ "user.user_id": req.body.user_id }, function (err, result) {
    // await UserGroup.find({ "user.user_id": { $all: req.body.user_id } }, function (err, result) {
    // console.log(result);
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    var data = [];
    result.forEach(res => {
      let obj = { name: res.name, group_id: res._id };
      res.user.forEach(user => {
        if (req.body.user_id == user.user_id) {
          obj['isAccepted'] = user.isAccepted;
        }
      });
      data.push(obj);
    });

    res.end(JSON.stringify(err ? err : data));

    // let allPromises = [];
    // result.forEach((group) => {
    //   // console.log("finding", group.group_id)
    //   let prom = GroupInfo.find({ _id: group.group_id });
    //   // ,function (err, result) {
    //   // console.log("before", result);
    //   // group['name'] = result[0].name;
    //   // console.log("after", result);
    //   // });
    //   allPromises.push(prom);
    // });
    // var groupNames = {};
    // Promise.all(allPromises).then((group) => {
    //   // console.log("values",group);
    //   group.forEach((gr) => {
    //     // console.log(gr,gr[0]["_id"],gr[0]["name"]);
    //     groupNames[gr[0]["_id"]] = gr[0]["name"];
    //   });

    //   console.log("groupNames", groupNames);
    //   result.forEach(res => {
    //     res.name = groupNames[res.group_id[0]]
    //   })
    //   res.end(JSON.stringify(err ? err : result));
    // });


    //   const asyncCallsPromise = result.forEach(async (group)=>{
    //     const asyncCalls = await GroupInfo.find({_id:group.group_id},function (err, result) {
    //       console.log("before", result);
    //       group['name'] = result[0].name;
    //       console.log("after", result);
    //   })
    //   // console.log(result);
    //   // res.end(JSON.stringify(err ? err : result));
    // });
    // const fileArr = await Promise.all(asyncCallsPromise);
    //   console.log(fileArr);

  });
});

app.post('/acceptInvite', async function (req, res) {
  console.log(req.body);
  Group.find({ _id: req.body.group_id }, function (err, result) {
    console.log("brfore", result[0]['user']);
    result[0]['user'].forEach(user => {
      if (user.user_id == req.body.user_id) {
        user.isAccepted = req.body.isAccepted;
      }
    });
    console.log("after", result[0]['user']);
    Group.where({ _id: req.body.group_id }).updateOne({ user: result[0]['user'] }, function (err, result) {
      console.log("updated");
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end(JSON.stringify(err ? err : result));
    });
  })
});

app.post('/addExpense', async function (req, res) {
  if (req.body.group_id && req.body.description && req.body.amount && req.body.paid_by) {
    // TODO check error
    let users = [];
    Group.find({ _id: req.body.group_id }, function (err, result) {
      console.log(result);
      result[0]['user'].forEach(user => {
        if (user.isAccepted == 1) {
          users.push(user.user_id);
        }
      });
      console.log(users,users.length);
      var splitAmount = (req.body.amount / users.length).toFixed(2);
      var unevenSplit = (req.body.amount - (users.length - 1) * splitAmount).toFixed(2);
      users.forEach(async (user, index) => {
        let data = {
          group_id:req.body.group_id, description:req.body.description, paid_by:req.body.paid_by, paid_to:user, amount:index == result.length - 1 ? unevenSplit : splitAmount, settled:'N'
        }
        const expenses = new Expenses(data);
        await expenses.save(function (err, result) {
          console.log("added",result);
        });
        // var tempSql = `INSERT into expenses_table (group_id, description, paid_by, paid_to, amount, settled) VALUES(${req.body.group_id},'${req.body.description}',${req.body.paid_by},${user.user_id},'${index == result.length - 1 ? unevenSplit : splitAmount}','N')`;
        // connection.query(tempSql, function (err, res) {
          // console.log("Inner query executed successfully", tempSql, res, err);
        // });
      });
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end(JSON.stringify(err ? err : result));
    });
  }
});


// app.post('/getAllExpenses', async function (req, res) {
//   var sql = `SELECT e.group_id,e.description,e.paid_by,e.paid_to,SUM(e.amount) as amount,e.settled,u.name AS paid_to_name,uu.name AS paid_by_name,e.created_date FROM expenses_table AS e INNER JOIN  user_profile_table AS u ON u.rec_id = e.paid_to INNER JOIN user_profile_table AS uu ON uu.rec_id = e.paid_by WHERE group_id='${req.body.group_id}' and e.settled='N' GROUP BY e.description ORDER BY e.rec_id desc`;
//   await connection.query(sql, function (error, result) {
//       if (error) {
//           res.writeHead(200, {
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

// app.post('/getAllIndividualExpenses', async function (req, res) {
//   var sql = `SELECT e.group_id,e.paid_to,u.name,e.settled,e.amount,e.created_date FROM expenses_table AS e INNER JOIN user_profile_table AS u ON e.paid_to=u.rec_id WHERE group_id='${req.body.group_id}' and e.settled='N'`;
//   await connection.query(sql, function (error, result) {
//       if (error) {
//           res.writeHead(200, {
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

// app.post('/getAllUserExpenses', async function (req, res) {
//   var sql = `SELECT e.group_id,e.description,e.paid_by,e.paid_to,u.name,e.settled,e.amount,e.created_date FROM expenses_table AS e INNER JOIN user_profile_table AS u ON e.paid_to=u.rec_id WHERE group_id in (SELECT group_id from user_group_table where user_id = '${req.body.user_id}')  and e.settled='N' order by e.created_date desc`;
//   await connection.query(sql, function (error, result) {
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


// app.post('/settleUp', async function (req, res) {
//   var sql = `UPDATE expenses_table SET settled='Y', updated_date=NOW() WHERE (paid_by=${req.body.paid_by} and paid_to=${req.body.paid_to}) or (paid_by=${req.body.paid_to} and paid_to=${req.body.paid_by})`;
//   await connection.query(sql, function (error, result) {
//       if (error) {
//           res.writeHead(200, {
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

// app.post('/updateUserProfile', async function (req, res) {
//   var sql = `UPDATE user_profile_table SET email='${req.body.email.toUpperCase()}', name='${req.body.name}', phone='${req.body.phone}', currency='${req.body.currency}', timezone='${req.body.timezone}', language='${req.body.language}',profile_picture_url='${req.body.profilePicture}' WHERE  rec_id=${req.body.id}`;
//   await connection.query(sql, function (error, result) {
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


// app.post('/getAllUserExpensesForRecentActivities', async function (req, res) {
//   var sql = `SELECT e.group_id,g.name as group_name,e.description,e.paid_by,e.paid_to,u.name,e.settled,SUM(e.amount) as amount,e.created_date, e.updated_date FROM expenses_table AS e INNER JOIN user_profile_table AS u ON e.paid_by=u.rec_id INNER JOIN group_info_table as g ON g.rec_id=e.group_id WHERE group_id in (SELECT group_id from user_group_table where user_id = '${req.body.user_id}') group by e.description order by e.updated_date desc, e.created_date desc`;
//   await connection.query(sql, function (error, result) {
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


// app.post('/getGroupMembers', async function (req, res) {
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


// app.post('/updateGroup', async function (req, res) {
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


// app.post('/exitGroup', async function (req, res) {
//   console.log(req.body);
//   var sql = `DELETE from user_group_table where user_id='${req.body.user_id}' and group_id='${req.body.group_id}'`;
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

//start your server on port 3002
app.listen(3002);
console.log("Server Listening on port 3002");

module.exports = app;