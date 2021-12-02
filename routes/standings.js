const express = require('express')
const router = express.Router()
const Standing = require('../models/Standing')

router.route('/')
    .get(async (req, res) => {
        try {
            const standings = await Standing.find()
            res.json(standings)
        } catch(err) {
            res.json({message: err})
        }
    })
    .post(async (req, res) => {
        const standing = new Standing({
            team: req.body.team,
            gp: req.body.gp,
            w: req.body.w,
            l: req.body.l,
            t: req.body.t,
            otl: req.body.otl,
            points: req.body.points,
            streak: req.body.streak,
            tieBreaker: req.body.tieBreaker,
        })

        try {
            const saveStandings = await standing.save()
            res.json(saveStandings)
        } catch(err) {
            res.json({message: err})
        }
    })
    .delete(async (req, res) => {
        try {
            const deletedStandings = await Standing.collection.drop()
            res.json(deletedStandings)
        } catch(err) {
            res.json({message: err})
        }
    })


module.exports = router