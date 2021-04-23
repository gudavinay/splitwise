const Expenses = require('../mongo/models/expenses')

function handle_request(msg, callback) {
  try {
    Expenses.find().or([{ "paid_to_users.paid_to": msg.user_id }, { "paid_by": msg.user_id }])
      .populate("group_id", ["name"])
      .populate("paid_to_users.paid_to", ["name"])
      .populate("paid_by", ["name"])
      .lean()
      .then((result) => {
        callback(null,result)
      });
  } catch (err) {
    console.log(err);
    callback(null, 'Internal Server Error.');
  }
};
exports.handle_request = handle_request;


