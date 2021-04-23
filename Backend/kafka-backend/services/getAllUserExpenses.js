const Expenses = require('../mongo/models/expenses')

function handle_request(msg, callback) {
  try {
    Expenses.find({
    }).or([{ "paid_to_users.paid_to": msg.user_id },
    { "paid_by": msg.user_id }])
      .populate("paid_to_users.paid_to", ["name"])
      .populate("paid_by", ["name"])
      .lean()
      .then((result) => {
        let data = [];
        result.forEach(exp => {
          exp.paid_to_users.forEach(paid_to_user => {
            if (paid_to_user.settled == 'N') {
              let obj = {
                created_date: exp.created_date,
                updated_date: exp.updated_date,
                group_id: exp.group_id._id,
                description: exp.description,
                paid_by: exp.paid_by._id,
                paid_by_name: exp.paid_by.name,
              }
              obj.paid_to = paid_to_user.paid_to._id;
              obj.paid_to_name = paid_to_user.paid_to.name;
              obj.name = paid_to_user.paid_to.name;
              obj.amount = paid_to_user.amount;
              obj.settled = paid_to_user.settled;
              data.push(obj);
            }
          });
        });
        callback(null,data);
      });
  } catch (err) {
    console.log(err);
    callback(null, 'Internal Server Error.');
  }
};
exports.handle_request = handle_request;


