const puppeteer = require('puppeteer')
const fetch = require('node-fetch')

async function fetchGameData() {
    let url = 'https://stats.sharksice.timetoscore.com/display-schedule?team=3328&season=51&league=1&stat_class=1'
    let gamesAPI = 'http://localhost:5000/api/games'

    const response = await fetch(gamesAPI)
    const currentData = await response.json()

    let playerAPI = 'http://localhost:5000/api/players'
    const playerResponse = await fetch(playerAPI)
    const playerData = await playerResponse.json()

    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    })

    const page = await browser.newPage()
    await page.goto(url, { waitUntil: 'networkidle2' })

    let months = {
        Jan: '1',
        Feb: '2',
        Mar: '3',
        Apr: '4',
        May: '5',
        Jun: '6',
        Jul: '7',
        Aug: '8',
        Sep: '9',
        Oct: '10',
        Nov: '11',
        Dec: '12'
    }

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

        let gameData = []
        rawGameData.forEach((item) => {
            if(item.includes('SIAHL') || item.includes('Scoresheet')) return
            gameData.push(item)
        })

        gameArray.push(gameData)
    })

    console.log(playerData)

    gameArray.forEach((game, i) => {
        let gameNumber = game[0].split('*')

        let dateSplit = game[1].slice(1, -1).split(' ')
        //TODO: Find a way to determine which year the game is in
        let formatDate = dateSplit[0] + ' ' + months[dateSplit[1]] + '/' + dateSplit[2] + '/' + '2021'

        gameObjects[i] = {}
        gameObjects[i].number = gameNumber[0]
        gameObjects[i].date = formatDate
        gameObjects[i].time = game[2].slice(1, -1)
        gameObjects[i].rink = game[3].slice(1, -1)
        gameObjects[i].division = game[4].slice(1, -1)
        gameObjects[i].homeTeam = game[5].slice(1, -1)
        gameObjects[i].homeScore = game[6].slice(1, -1)
        gameObjects[i].awayTeam = game[7].slice(1, -1)
        gameObjects[i].awayScore = game[8].slice(1, -1)
        gameObjects[i].comments = []
        gameObjects[i].isUndecided = playerData
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