const puppeteer = require('puppeteer')
const fetch = require('node-fetch')

async function fetchGameData() {
    let url = 'https://stats.sharksice.timetoscore.com/display-schedule?team=3328&season=51&league=1&stat_class=1'
    let API = 'http://localhost:5000/api/games'

    const response = await fetch('http://localhost:5000/api/games')
    const currentData = await response.json()

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    })

    const page = await browser.newPage()
    await page.goto(url, { waitUntil: 'networkidle2' })

    let gameArray = []
    let gameObjects = []

    const tables = await page.$$eval('body > center:nth-child(3) > table:nth-child(1) > tbody:nth-child(1)',
        list => list.map(data => {
            let arr = []
            let rawData = Array.from(data.childNodes)

            rawData.forEach((element) => {
                arr.push(element.innerText)
            })

            arr.shift()
            arr.shift()

            return arr
        })
    )

    tables[0].forEach((table) => {
        const rawGameData = table.split('\t')
        rawGameData.shift()

        let gameData = []
        rawGameData.forEach((item) => {
            if(item.includes('SIAHL') || item.includes('Scoresheet')) return
            gameData.push(item)
        })

        gameArray.push(gameData)
    })

    gameArray.forEach((game, i) => {
        gameObjects[i] = {}
        gameObjects[i].number = i
        gameObjects[i].date = game[0]
        gameObjects[i].time = game[1]
        gameObjects[i].rink = game[2]
        gameObjects[i].division = game[3]
        gameObjects[i].homeTeam = game[4]
        gameObjects[i].homeScore = game[5]
        gameObjects[i].awayTeam = game[6]
        gameObjects[i].awayScore = game[7]
        gameObjects[i].comments = []
        gameObjects[i].isPlaying = []
        gameObjects[i].isNotPlaying = []
        gameObjects[i].isMaybePlaying = []
    })

    gameObjects.forEach(async (game, i) => {
        if(game !== currentData[i]) {
            const updatedInfo = {
                date: game.date,
                time: game.time,
                rink: game.rink,
                homeScore: game.homeScore,
                awayScore: game.awayScore
            }

            try {
                const response = await fetch(`http://localhost:5000/api/games/${i}`, {
                    method: 'PATCH',
                    body: JSON.stringify(updatedInfo),
                    headers: { 'Content-Type': 'application/json' }
                })

                const data = await response.json()
                console.log(data)
            }   catch(err) {
                console.log({message: err})
            }
            
        }

        if(i > currentData.length) {
            try {
                const response = await fetch('http://localhost:5000/api/games', {
                    method: 'POST',
                    body: JSON.stringify(game),
                    headers: { 'Content-Type': 'application/json' }
                })

                const data = await response.json()
                console.log(data)
            } catch(err) {
                console.log({message: err})
            }
        }
    })

    await browser.close()
}

fetchGameData()

module.exports = fetchGameData