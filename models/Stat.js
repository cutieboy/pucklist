const mongoose = require('mongoose')

const StatSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    gamesPlayed: {
        type: String,
        required: true
    },
    goals: {
        type: String,
        required: true
    },
    assists: {
        type: String,
        required: true
    },
    ppg: {
        type: String,
        required: true
    },
    ppa: {
        type: String,
        required: true
    },
    shg: {
        type: String,
        required: true
    },
    sha: {
        type: String,
        required: true
    },
    gwg: {
        type: String,
        required: true
    },
    gwa: {
        type: String,
        required: true
    },
    psg: {
        type: String,
        required: true
    },
    eng: {
        type: String,
        required: true
    },
    sog: {
        type: String,
        required: true
    },
    points: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Stats', StatSchema)