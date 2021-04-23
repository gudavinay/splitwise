const Expenses = require('../mongo/models/expenses')

 function handle_request(msg, callback) {
  try {
    Expenses.findOneAndUpdate({ _id: msg.expense_id }, { $pull: { "notes": { _id: msg.comment_id } } }, function (err, result) {
      console.log("done", result);
      callback(null,result);
    });
  }catch(err){
    console.log(err);
    callback(null,'Internal Server Error.');
  }
};
exports.handle_request = handle_request;


