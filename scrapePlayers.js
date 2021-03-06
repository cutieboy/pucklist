const puppeteer = require('puppeteer')
const fetch = require('node-fetch')

async function fetchPlayers() {
    let URL = 'https://stats.sharksice.timetoscore.com/display-schedule?team=3328&season=51&league=1&stat_class=1'
    let API = 'http://localhost:5000/api/players'

    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    })

    const page = await browser.newPage()
    await page.goto(URL, { waitUntil: 'networkidle2' })

    let statArray = []
    let statObjects = []

    const tables = await page.$$eval('body > center:nth-child(7) > table:nth-child(1) > tbody:nth-child(1)',
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
            gameData.push(item)
        })

        statArray.push(gameData)
    })

    statArray.forEach((stat, i) => {
        statObjects[i] = {}
        statObjects[i].name = stat[0]
        statObjects[i].number = stat[1]
    })

    statObjects.forEach(async (stat) => {
        try {
            const response = await fetch('http://localhost:5000/api/stats', {
                method: 'POST',
                body: JSON.stringify(stat),
                headers: { 'Content-Type': 'application/json' }
            })

            const data = await response.json()
            console.log(data)
        } catch(err) {
            console.log({message: err})
        }
    })

    await browser.close()
}

fetchPlayers()