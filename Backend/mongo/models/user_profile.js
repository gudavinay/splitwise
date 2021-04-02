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
        profile_picture_url:{
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
const UserProfile = mongoose.model("UserProfile", UserProfileSchema);
module.exports = UserProfile;