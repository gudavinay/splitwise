const Expenses = require('../mongo/models/expenses')

function handle_request(msg, callback) {
  try {
    Expenses.find({ group_id: msg.group_id })
      .populate('group_id', ["name"])
      .populate('paid_by', ["name"])
      .populate('notes.created_by', ["name"])
      .lean()
      .then((result) => {
        let data = [];
        result.forEach(exp => {
          let obj = {
            _id: exp._id,
            created_date: exp.created_date,
            updated_date: exp.updated_date,
            group_id: exp.group_id._id,
            description: exp.description,
            paid_by: exp.paid_by._id,
            name: exp.paid_by.name,
            paid_by_name: exp.paid_by.name,
            amount: exp.amount,
            notes: exp.notes
          }
          data.push(obj);
        });
        callback(null,data.reverse());
      });
  } catch (err) {
    console.log(err);
    callback(null, 'Internal Server Error.');
  }
};
exports.handle_request = handle_request;


