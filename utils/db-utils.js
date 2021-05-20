require('dotenv').config()
var mongoose = require('mongoose') 

var userschema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    }
)

let usermodel = mongoose.model('user', userschema);

let AddNewToDB = (param) => {
    
    return new Promise((resolve, reject) => {

        let model = new usermodel(param)
        model.save(function (err, data) {
            if(err) return reject(err);
            return resolve(data);
        })
    })
}

let GetFromDB = async (queryparameter) => {

    return new Promise((resolve, reject) => {

        let query = usermodel.find(queryparameter)
        query.exec(function(err, data) {
            if(err) {
                return reject(err)
            }            
            return resolve(data);
        })
    })

}

module.exports = {AddNewToDB, GetFromDB} 