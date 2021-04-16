const mongoose = require('mongoose');
const GroupSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            unique: true
        },
        profile_picture_url:{
            type: String
        },
        user: [{
            user_id: { type: mongoose.Schema.Types.ObjectId, ref:"UserProfile" },
            isAccepted: { 
                type: Number
            }
        }]
        
    }
);
module.exports = mongoose.model("Group", GroupSchema);