const puppeteer = require('puppeteer')
const fetch = require('node-fetch')

async function fetchStats() {
    let URL = 'https://stats.sharksice.timetoscore.com/display-stats.php?league=1'
    let API = 'http://localhost:5000/api/standings'

    await fetch(API, {
        method: 'DELETE'
    })

    const browser = await puppeteer.launch({
        headless: true,
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
        '.collaptable > tbody:nth-child(1) > tr:nth-child(106)',
        '.collaptable > tbody:nth-child(1) > tr:nth-child(107)',
        '.collaptable > tbody:nth-child(1) > tr:nth-child(108)',
    ]

    let teamArray = []
    let teamObjects = []

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
        return tables[0]
    }

    teams.forEach(async (team, i) => {
        const teamData = await getTeamData(team)
        const teamObject = {
            team: teamData[0],
            gp: teamData[1],
            w: teamData[2],
            l: teamData[3],
            t: teamData[4],
            otl: teamData[5],
            points: teamData[6],
            streak: teamData[7],
            tieBreaker: teamData[8]
        }

        try {
            const response = await fetch('http://localhost:5000/api/standings', {
                method: 'POST',
                body: JSON.stringify(teamObject),
                headers: { 'Content-Type': 'application/json' }
            })
            const data = await response.json()
            console.log(data)
        } catch(err) {
            console.log({message: err})
        }
        
        if(i === teams.length - 1) {
            console.log(teamObjects)
            await browser.close()
        }
    })
}

fetchStats()