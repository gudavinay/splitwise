const UserProfile = require('../mongo/models/user_profile')
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const config = require('../../mongo/config')

function handle_request(msg, callback) {
  var res = {};
  try {
    const data = {
      email: msg.email.toUpperCase(),
      name: msg.name,
      password: passwordHash.generate(msg.password)
    };
    const up = new UserProfile(data);
    up.save(function (err, result) {
      if (err) {
        return callback(null, "ER_DUP_ENTRY");
      }
      const token = jwt.sign({ _id: result._id }, config.secret, {
        expiresIn: 1008000
      })
      var data = JSON.parse(JSON.stringify(result));
      delete data.password;
      data.token = token;
      res = data;
      callback(null, res);
    });
  } catch (err) {
    console.log(err);
    callback(null, 'Internal Server Error.');
  }
};
exports.handle_request = handle_request;


