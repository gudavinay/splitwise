const Group = require('../mongo/models/group')

function handle_request(msg, callback) {
  try {
    Group.findOne({ _id: msg.group_id })
      .lean()
      .then(result => {
        var userList = [];
        result.user.forEach(user => {
          if (user.user_id != msg.user_id) {
            userList.push(user);
          }
        });
        result.user = userList;
        Group.findOneAndUpdate({ _id: msg.group_id }, result)
          .then(result => {
            callback(null,result);
          })
      })
  } catch (err) {
    console.log(err);
    callback(null, 'Internal Server Error.');
  }
};
exports.handle_request = handle_request;


