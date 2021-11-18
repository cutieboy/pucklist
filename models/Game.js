const mongoose = require('mongoose')

const GameSchema = mongoose.Schema({
    number: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    rink: {
        type: String,
        required: true
    },
    division: {
        type: String,
        required: true
    },
    homeTeam: {
        type: String,
        required: true
    },
    awayTeam: {
        type: String,
        required: true
    },
    comments: {
        type: Array,
        required: true
    },
    isPlaying: {
        type: Array,
        required: true
    },
})

module.exports = mongoose.model('Games', GameSchema)