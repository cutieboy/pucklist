const mongoose = require('mongoose')

const PlayerSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    usah: {
        type: String,
        default: ''
    },
    profilePicture: {
        type: String,
        default: null
    },
    status: {
        type: String,
        default: 'Inactive'
    },
    role: {
        type: String,
        default: 'Player'
    },
    number: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Players', PlayerSchema)