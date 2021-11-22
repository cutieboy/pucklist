const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config')

const gameRouter = require('./routes/games')
const statRouter = require('./routes/stats')
const playerRouter = require('./routes/players')

const app = express()

//Middlewares
app.use(cors())
app.use(express.json({
    type: "*/*"
}))

app.use('/api/games', gameRouter)
app.use('/api/stats', statRouter)
app.use('/api/players', playerRouter)

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log("MongoDB Connected Successfully")
})

//Initialize Server
app.listen(process.env.SERVER_PORT || 5000, () => {
    console.log(`Server listening on port ${process.env.SERVER_PORT}`)
})