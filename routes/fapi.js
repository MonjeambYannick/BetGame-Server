const express = require('express')
const router = express.Router()

const axios = require('axios')

const API_URL = 'http://api.football-data.org/v2/competitions/EC'
const API_TOKEN = process.env.API_TOKEN

let FETCH = (route, params) => {

    const URL = API_URL + route

    console.log("FETCHING FROM: " + URL);

    return axios.get(URL, {
        method: 'GET',
        headers: {
            'X-Auth-Token': API_TOKEN
        },
        params: params
    })

}

router.get('/fetch_teams', async (req, res) => {

    let response = await FETCH('/teams', {})
    let data = response.data

    let teams = []

    data.teams.forEach(element => {
        teams.push({
            name: element.name,
            id: element.id,
            tla: element.tla,
            logo_url: element.crestUrl
        })
    })

    res.json({ data: teams })

})

router.get('/fetch_matches', async (req, res) => {

    let response = await FETCH('/matches', {})
    let data = response.data

    let matches = []

    data.matches.forEach(element => {

        matches.push({
            match_id: element.id,
            group: element.group,
            status: element.status,
            stage: element.stage,
            score: {
                winner: element.score.winner,
                homeTeamGoals: element.score.fullTime.homeTeam,
                awayTeamGoals: element.score.fullTime.awayTeam
            },
            homeTeam: element.homeTeam.id,
            awayTeam: element.awayTeam.id,
            matchday: element.matchday,
            date: new Date(element.utcDate).toLocaleString()
        })
    });

    res.json({ data: matches })

})

module.exports = router