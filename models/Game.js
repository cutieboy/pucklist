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
    homeScore: {
        type: String,
    },
    awayScore: {
        type: String,
    },
    comments: {
        type: Array,
        required: true
    },
    isPlaying: {
        type: Array,
        required: true,
        default: []
    },
    isNotPlaying: {
        type: Array,
        required: true,
        default: []
    },
    isMaybePlaying: {
        type: Array,
        required: true,
        default: []
    },
    isUndecided: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('Games', GameSchema)