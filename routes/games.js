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
            comments: req.body.comments,
            isPlaying: req.body.isPlaying
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

router.route('/:id')
    .get(async (req, res) => {
        try {
            const game = await Post.findById(req.params.id)
            res.json(game)
        } catch(err) {
            res.json({message: err})
        }
    })
    .delete(async (req, res) => {
        try {
            const removedGame = await Post.remove({ _id: req.params.id })
            res.json({message: `${req.params.id} has been removed`})
        } catch(err) {
            res.json({message: err})
        }
    })

module.exports = router