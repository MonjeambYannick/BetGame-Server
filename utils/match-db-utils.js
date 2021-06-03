var mongoose = require('mongoose')

var matchschema = new mongoose.Schema(
    {
        match_id: String, // match id
        matchday: String,
        status: String,
        stage: String,
        group: String,
        date: String,
        score: {
            winner: String, // id
            homeTeam: String, // id
            awayTeam: String, // id
        },
        homeTeam: String, // id
        awayTeam: String // id
    }
)

let matchmodel = mongoose.model('match', matchschema);

module.exports = {}