const Expenses = require('../mongo/models/expenses')

function handle_request(msg, callback) {
  try {
    Expenses.findOneAndUpdate({ _id: msg.expense_id }, { $push: { "notes": { note: msg.note, created_by: msg.user_id } } }, { new: true }, function (err, result) {console.log("IN POST COMMENT");
    console.log("************************",result.notes,"************************");
      callback(null,result)
    });
  } catch (err) {
    console.log(err);
    callback(null, 'Internal Server Error.');
  }
};
exports.handle_request = handle_request;


