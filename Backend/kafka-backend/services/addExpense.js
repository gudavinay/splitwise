const Group = require('../mongo/models/group');
const Expenses = require('../mongo/models/expenses')

function handle_request(msg, callback) {
  try {
    console.log("REQUEST FOR ADD EXPENSE");
  console.log(msg);
    if (msg.group_id && msg.description && msg.amount && msg.paid_by) {
      // TODO check error
      let users = [];
      Group.find({ _id: msg.group_id }, async function (err, result) {
        result[0]['user'].forEach(user => {
          if (user.isAccepted == 1 && user.user_id != msg.paid_by) {
            users.push(user.user_id);
          }
        });
        var splitAmount = (msg.amount / (users.length + 1)).toFixed(2);
        var unevenSplit = (msg.amount - (users.length) * splitAmount).toFixed(2);
        let paid_to_users = [];
        users.forEach((user, index) => {
          paid_to_users.push({
            paid_to: user,
            amount: index == result.length - 1 ? unevenSplit : splitAmount,
            settled: 'N'
          })
        });
        let data = {
          group_id: msg.group_id,
          description: msg.description,
          paid_by: msg.paid_by,
          paid_to_users: paid_to_users,
          amount: msg.amount
        }
        const expenses = new Expenses(data);
        expenses.save(function (err, result) {
          console.log("RESPONSE FOR ADD EXPENSE", result);
        });
        callback(null, err ? err : result);
      });
    }
  } catch (err) {
    console.log(err);
    callback(null, 'Internal Server Error.');
  }
};
exports.handle_request = handle_request;


