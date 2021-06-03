require('dotenv').config()
var mongoose = require('mongoose')

var groupschema = new mongoose.Schema(

    {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        data: String,
        users: [ // id of users
            {
                id: String, // USER ID
                matches: [
                    {
                        match_id: String, //
                        score: {
                            winner: String,
                            homeTeamGoals: Number,
                            awayTeamGoals: Number,
                        }
                    }
                ]
            }
        ]
    }

)


groupmodel = mongoose.model('group', groupschema);

let AddGroup = async (param) => {
    return new Promise((resolve, reject) => {
        let model = new groupmodel(param)
        model.save((err, data) => {
            if (err) return reject(err);
            return resolve(data);
        })
    })
}

let GetGroup = async (queryparameter) => {
    return new Promise((resolve, reject) => {
        let query = groupmodel.find(queryparameter)
        query.exec((err, data) => {
            if (err) return reject(err)
            return resolve(data);
        })
    })
}

let AddUserToGroup = async (group_id, user_id) => {
    return new Promise((resolve, reject) => {
        groupmodel.update({ id: group_id }, { $addToSet: { users: { id: user_id } } }, (err, data) => {
            if (err) return reject(err);
            return resolve(data)
        })
    })
}

let FindAndUpdateGroup = async (queryparameter, newdata) => { // without upsert (no new creation if object doesnt exists)
    return new Promise((resolve, reject) => {
        groupmodel.findOneAndUpdate(queryparameter, newdata, { upsert: false }, (err, data) => {
            if (err) return reject(err);
            return resolve(data);
        })
    })
}

module.exports = { AddGroup, GetGroup, FindAndUpdateGroup, AddUserToGroup }