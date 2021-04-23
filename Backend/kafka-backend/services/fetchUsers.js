const UserProfile = require('../mongo/models/user_profile')

function handle_request(msg, callback) {
  console.log("inside fetchUsers");
  try {
    UserProfile.find({}, function (err, result) {
      console.log(result, err);
      callback(null, err ? err : JSON.parse(JSON.stringify(result).toLocaleLowerCase()));
      // callback(null,"");
    });
  } catch (err) {
    console.log(err);
    callback(null, 'Internal Server Error........');
  }
};
exports.handle_request = handle_request;


