const express = require('express')
const router = express.Router()
const Stat = require('../models/Stat')

router.route('/')
    .get(async (req, res) => {
        try {
            const stats = await Stat.find()
            res.json(stats)
        } catch(err) {
            res.json({message: err})
        }
    })
    .post(async (req, res) => {
        const stat = new Stat({
            name: req.body.name,
            number: req.body.number,
            gamesPlayed: req.body.gamesPlayed,
            goals: req.body.goals,
            assists: req.body.assists,
            ppg: req.body.ppg,
            ppa: req.body.ppa,
            shg: req.body.shg,
            sha: req.body.sha,
            gwg: req.body.gwg,
            gwa: req.body.gwa,
            psg: req.body.psg,
            eng: req.body.eng,
            sog: req.body.sog,
            points: req.body.points
        })

        try {
            const saveStats = await stat.save()
            res.json(saveStats)
        } catch(err) {
            res.json({message: err})
        }
    })
    .delete(async (req, res) => {
        try {
            const deletedStats = await Stat.collection.drop()
            res.json(deletedStats)
        } catch(err) {
            res.json({message: err})
        }
    })

module.exports = router