const express = require('express')
const router = express.Router()
const Game = require('../models/Game')

router.route('/')
    .get(async (req, res) => {
        try {
            const games = await Game.find()
            res.json(games)
        } catch(err) {
            res.json({message: err})
        }
    })
    .post(async (req, res) => {
        const game = new Game({
            number: req.body.number,
            date: req.body.date,
            time: req.body.time,
            rink: req.body.rink,
            division: req.body.division,
            homeTeam: req.body.homeTeam,
            awayTeam: req.body.awayTeam,
            homeScore: req.body.homeScore,
            awayScore: req.body.awayScore,
            comments: req.body.comments,
            isUndecided: req.body.isUndecided
        })

        try {
            const saveGames = await game.save()
            res.json(saveGames)
        } catch(err) {
            res.json({message: err})
        }
    })
    .delete(async (req, res) => {
        try {
            const deletedGames = await Game.collection.drop()
            res.json(deletedGames)
        } catch(err) {
            res.json({message: err})
        }
    })

router.route('/:number')
    .get(async (req, res) => {
        try {
            const game = await Game.findOne({number: req.params.number})
            res.json(game)
        } catch(err) {
            res.json({message: err})
        }
    })
    .patch(async (req, res) => {
        try {
            const updatedGame = await Game.findOneAndUpdate({number: req.params.number}, req.body, {
                new: true
            })
            res.json(updatedGame)
        } catch(err) {
            res.json({message: err})
        }
    })
    .delete(async (req, res) => {
        try {
            const removedGame = await Post.remove({number: req.params.number })
            res.json({message: `${req.params.number} has been removed`})
        } catch(err) {
            res.json({message: err})
        }
    })

module.exports = router