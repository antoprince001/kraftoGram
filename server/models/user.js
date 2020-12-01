const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password :{
        type: String,
        required: true
    },
    role:{
        type:String
    },
    resetToken: String,
    expireToken: Date,
    about:{
        type:String
    },
    pic:{
        type:String,
        default: "https://res.cloudinary.com/chordsnstrings/image/upload/v1606728864/504-5040528_empty-profile-picture-png-transparent-png_q9zh7t.png"
    },
    followers:[
        {
            type:ObjectId,
            ref:"User"
        }
    ],
    following:[
        {
            type:ObjectId,
            ref:"User"
        }
    ],

})

mongoose.model("User", userSchema);