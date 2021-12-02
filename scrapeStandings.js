const puppeteer = require('puppeteer')
const fetch = require('node-fetch')

async function fetchStats() {
    let URL = 'https://stats.sharksice.timetoscore.com/display-stats.php?league=1'
    let API = 'http://localhost:5000/api/standings'

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    })

    const page = await browser.newPage()
    await page.goto(URL, { waitUntil: 'networkidle2' })

    const team = '.collaptable > tbody:nth-child(1) > tr:nth-child(99)'

    const teams = [
        '.collaptable > tbody:nth-child(1) > tr:nth-child(99)',
        '.collaptable > tbody:nth-child(1) > tr:nth-child(100)',
        '.collaptable > tbody:nth-child(1) > tr:nth-child(101)',
        '.collaptable > tbody:nth-child(1) > tr:nth-child(102)',
        '.collaptable > tbody:nth-child(1) > tr:nth-child(103)',
        '.collaptable > tbody:nth-child(1) > tr:nth-child(104)',
        '.collaptable > tbody:nth-child(1) > tr:nth-child(105)',
    ]

    let teamArray = []
    let statObjects = []

    const getTeamData = async(teamSelector) => {
        const tables = await page.$$eval(teamSelector,
            list => list.map(data => {
                let arr = []
                let rawData = Array.from(data.childNodes)

                rawData.forEach((element) => {
                    arr.push(element.innerText)
                })

                return arr
            })
        )
        teamArray.push(tables[0])
        console.log(teamArray)
    }

    teams.forEach((team) => {
        getTeamData(team)
    })


    // tables[0].forEach((table) => {
    //     const rawGameData = table.split('\t')

    //     let gameData = []
    //     rawGameData.forEach((item) => {
    //         gameData.push(item)
    //     })

    //     statArray.push(gameData)
    // })

    // statArray.forEach((stat, i) => {
    //     statObjects[i] = {}
    //     statObjects[i].name = stat[0]
    //     statObjects[i].number = stat[1]
    //     statObjects[i].gamesPlayed = stat[2]
    //     statObjects[i].goals = stat[3]
    //     statObjects[i].assists = stat[4]
    //     statObjects[i].ppg = stat[5]
    //     statObjects[i].ppa = stat[6]
    //     statObjects[i].shg = stat[7]
    //     statObjects[i].sha = stat[8]
    //     statObjects[i].gwg = stat[9]
    //     statObjects[i].gwa = stat[10]
    //     statObjects[i].psg = stat[11]
    //     statObjects[i].eng = stat[12]
    //     statObjects[i].sog = stat[13]
    //     statObjects[i].points = stat[14]
    // })

    // statObjects.forEach(async (stat) => {
    //     try {
    //         const response = await fetch('http://localhost:5000/api/stats', {
    //             method: 'POST',
    //             body: JSON.stringify(stat),
    //             headers: { 'Content-Type': 'application/json' }
    //         })

    //         const data = await response.json()
    //         console.log(data)
    //     } catch(err) {
    //         console.log({message: err})
    //     }
    // })

}

fetchStats()