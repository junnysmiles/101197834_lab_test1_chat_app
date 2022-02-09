const mongoose = require('mongoose')

// Create User Schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username!'],
        unique: true,
        trim: true,
        lowercase: true
    },
    firstname: {
        type: String,
        required: [true, 'Please enter your first name!'],
        trim: true
    },
    lastname: {
        type: String,
        required: [true, 'Please enter your last name!'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Please enter a password!'],
        trim: true
    },
    createon: {
        type: Date,
        default: Date.now,
        alias: 'createdon'
    }
})

UserSchema.static('getUsername', function(value) {
    return this.find({username: value})
})

const User = mongoose.model("User", UserSchema)
module.exports = User