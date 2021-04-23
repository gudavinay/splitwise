const Group = require('../mongo/models/group')

function handle_request(msg, callback) {
  try {
    Group.find({ _id: msg.group_id }, function (err, result) {
      result[0]['user'].forEach(user => {
        if (user.user_id == msg.user_id) {
          user.isAccepted = msg.isAccepted;
        }
      });
      Group.where({ _id: msg.group_id }).updateOne({ user: result[0]['user'] }, function (err, result) {
        callback(null, err ? err : result);
      });
    })
  } catch (err) {
    console.log(err);
    callback(null, 'Internal Server Error.');
  }
};
exports.handle_request = handle_request;


