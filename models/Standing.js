const mongoose = require('mongoose')

const StandingSchema = mongoose.Schema({
    team: {
        type: String,
        required: true
    },
    gp: {
        type: String,
        required: true
    },
    w: {
        type: String,
        required: true
    },
    l: {
        type: String,
        required: true
    },
    t: {
        type: String,
        required: true
    },
    otl: {
        type: String,
        required: true
    },
    points: {
        type: String,
        required: true
    },
    streak: {
        type: String,
        required: true
    },
    tieBreaker: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Standings', StandingSchema)