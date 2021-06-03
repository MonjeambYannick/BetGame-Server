var mongoose = require('mongoose')

var teamschema = new mongoose.Schema(
    {
        id: String, //
        name: String, //
        logourl: String
    }
)

let teammodel = mongoose.model('team', teamschema);

module.exports = {}