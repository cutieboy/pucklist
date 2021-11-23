const express = require('express')
const router = express.Router()
const Player = require('../models/Player')
const { playerValidation } = require('../validation')

router.route('/')
    .get(async (req, res) => {
        try {
            const stats = await Player.find()
            res.json(stats)
        } catch(err) {
            res.json({message: err})
        }
    })
    .post(async (req, res) => {
        const { error } = playerValidation(req.body)
        if(error) return res.status(400).send(error.details[0].message)

        const emailExists = await Player.findOne({email: req.body.email})
        if(emailExists) return res.status(400).send({message: 'Email already exists'})

        const player = new Player({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            status: req.body.status,
            number: req.body.number
        })

        try {
            const savePlayer = await player.save()
            res.json(savePlayer)
        } catch(err) {
            res.json({message: err})
        }
    })
    .delete(async (req, res) => {
        try {
            const deletedPlayer = await Player.collection.drop()
            res.json(deletedPlayer)
        } catch(err) {
            res.json({message: err})
        }
    })

router.route('/:id')
    .get(async(req, res) => {
        try {
            const player = await Player.findOne({_id: req.params.id})
            res.json(player)
        } catch(err) {
            res.json({message: err})
        }
    })
    .delete(async(req, res) => {
        try {
            const player = await Player.deleteOne({_id: req.params.id})
            res.json(`${req.params.id} has been deleted`)
        } catch(err) {
            res.json({message: err})
        }
    })
    .patch(async (req, res) => {
        try {
            const updatedPlayer = await Player.findOneAndUpdate({_id: req.params.id}, req.body, {
                new: true
            })
            res.json(updatedPlayer)
        } catch(err) {
            res.json({message: err})
        }
    })

module.exports = router