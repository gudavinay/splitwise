const mongoose = require('mongoose');
const UserProfileSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            required: true,
            unique: true
        },
        name:{
            type: String
        },
        password:{
            type: String
        },
        profilePicture:{
            type: String
        },
        phone:{
            type: String
        },
        currency:{
            type: String,
            default: 'USD'
        },
        timezone:{
            type: String,
            default: '-8'
        },
        language:{
            type: String,
            default: 'EN'
        }
    }
);

module.exports = mongoose.model("UserProfile", UserProfileSchema);