const mongoose = require('mongoose');
const { Schema } = mongoose;
// TODO
// _someId: Schema.Types.ObjectId,
const ExpensesSchema = new mongoose.Schema(
    {
        group_id: { type: Schema.Types.ObjectId, ref: "Group" },
        description: {
            type: String
        },
        paid_by: { type: Schema.Types.ObjectId, ref: "UserProfile" },
        paid_to_users: [{
            paid_to: { type: Schema.Types.ObjectId, ref: "UserProfile" },
            amount: {
                type: String
            },
            settled: {
                type: String
            }
        }],
        amount: {
            type: String
        },
        created_date: { type: Date, default: Date.now() },
        updated_date: { type: Date, default: Date.now() },
        notes:[{
            note:{type: String},
            created_by:{ type: Schema.Types.ObjectId, ref: "UserProfile" },
            created_date: { type: Date, default: Date.now() }
        }]
    }
);

module.exports = mongoose.model("Expenses", ExpensesSchema);