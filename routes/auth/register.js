const express = require('express');
const router = express.Router()

const jwt = require('jsonwebtoken')

const hash = require('../../utils/hash-utils')
const dbutils = require('../../utils/db-utils')

router.post('/', function(req, res) {

    // validate email
    let email = req.body.email
    dbutils.GetFromDB({email: email}).then(result => {
        console.log('====================================');
        console.log(result);
        console.log('====================================');
        if(result)
        {
            console.log("error");
            res.json({status: 420, token: 0})
        } else {
        }
        
        let password = req.body.password
        let passwordhash = hash("sha256", "hex", password)
        
        let user = {
            name: req.body.username,
            password: passwordhash,
            email: email
        }
        
        dbutils.AddNewToDB(user).then(resp => {
            console.log('====================================');
            console.log(resp);
            console.log('====================================');
        })
    })


})

module.exports = router