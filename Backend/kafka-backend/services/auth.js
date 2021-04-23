const UserProfile = require('../mongo/models/user_profile');

function handle_request(msg, callback) {
  var res = {};
  try {
    UserProfile.findById(msg, (err, results) => {
      if (err) {
          console.log("ERR-----",err);
          return callback(err, false);
      }
      if (results) {
          console.log("RESUYLTS----");
          callback(null, results);
      }
      else {
          console.log("ELSE-----");
          callback(null, false);
      }
  });
  } catch (err) {
    console.log(err);
    callback(null, "Internal Server Error.");
  }
};
exports.handle_request = handle_request;


