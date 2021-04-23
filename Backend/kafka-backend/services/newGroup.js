const Group = require('../mongo/models/group')

function handle_request(msg, callback) {
  try {
    var users = [];
    msg.userIDArray.forEach(user => {
      const userData = {
        user_id: user,
        isAccepted: user == msg.user_rec_id ? 1 : 0
      };
      users.push(userData);
    });
    const data = {
      name: msg.groupName,
      admin_email: msg.email,
      profile_picture_url: msg.profilePicture,
      user: users
    };
    const group = new Group(data);
    group.save(function (err, result) {
      callback(null, err ? "ER_DUP_ENTRY" : result);
    });
  } catch (err) {
    console.log(err);
    callback(null, 'Internal Server Error.');
  }
};
exports.handle_request = handle_request;


