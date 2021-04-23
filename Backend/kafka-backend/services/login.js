const UserProfile = require('../mongo/models/user_profile');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const config = require('../../mongo/config')

function handle_request(msg, callback) {
  var res = {};
  try {
    UserProfile.findOne({ email: msg.email.toUpperCase() }, function (err, result) {
      if (result && result['password'] && passwordHash.verify(msg.password, result['password'])) {
        const token = jwt.sign({ _id: result._id }, config.secret, {
          expiresIn: 1008000
        })
        var data = JSON.parse(JSON.stringify(result));
        delete data.password;
        data.token = token;
        res = data;
      } else {
        res = "Unsuccessful Login";
      }
      callback(null, res);
    });
  } catch (err) {
    console.log(err);
    callback(null, "Internal Server Error.");
  }
};
exports.handle_request = handle_request;


