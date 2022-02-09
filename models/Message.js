const mongoose = require('mongoose')

// Create User Schema
const MessageSchema = new mongoose.Schema({
    from_user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        ref: "User"
    },
    room: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date_sent: {
        type: Date,
        default: Date.now
    }
})

const Message = mongoose.model("Message", MessageSchema)
module.exports = Message