const Group = require('../mongo/models/group')

function handle_request(msg, callback) {
  try {
    Group.find({ "user.user_id": msg.user_id }, function (err, result) {
      var data = [];
      result.forEach(res => {
        let obj = { name: res.name, group_id: res._id };
        res.user.forEach(user => {
          if (msg.user_id == user.user_id) {
            obj['isAccepted'] = user.isAccepted;
          }
        });
        data.push(obj);
      });
      callback(null, err ? err : data);
    });
  } catch (err) {
    console.log(err);
    callback(null, 'Internal Server Error.');
  }
};
exports.handle_request = handle_request;


