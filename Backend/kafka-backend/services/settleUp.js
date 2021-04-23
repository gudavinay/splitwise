const Expenses = require('../mongo/models/expenses')

function handle_request(msg, callback) {
  try {
    Expenses.find()
    .or([{ "paid_to_users.paid_to": msg.paid_to, "paid_by": msg.paid_by },
    { "paid_to_users.paid_to": msg.paid_by, "paid_by": msg.paid_to }])
      .lean()
      .then((result) => {
        console.log("in settle up", result);
        result.forEach(exp => {
          let countOfSettled = 0;
          exp.paid_to_users.forEach(paid_to_user => {
            if ((msg.paid_to == paid_to_user.paid_to && msg.paid_by == exp.paid_by) || (msg.paid_by == paid_to_user.paid_to && msg.paid_to == exp.paid_by)) {
              paid_to_user.settled = 'Y';
            }
          });
          exp.paid_to_users.forEach(paid_to_user => {
            if (paid_to_user.settled == 'N') {
              countOfSettled++;
            }
          });
          if (countOfSettled == 1) {
            exp.paid_to_users.forEach(paid_to_user => {
              paid_to_user.settled = 'Y';
            });
          }
          const updatedArray = exp.paid_to_users;
          const updateDocument = {
            $set: { "paid_to_users": updatedArray, "updated_date": new Date() }
          };
          Expenses.updateOne({ _id: exp._id }, updateDocument, function (err, result) {
            console.log("done", result);
            return callback(null,result);
          })
        });
        callback(null,result);
      });
  } catch (err) {
    console.log(err);
    callback(null, 'Internal Server Error.');
  }
};
exports.handle_request = handle_request;


