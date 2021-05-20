const express = require('express');
const router = express.Router()

const jwt = require('jsonwebtoken')

const hash = require('../../utils/hash-utils')
const dbutils = require('../../utils/db-utils')


router.post('/', function(req, res) {



    let user = {
        email: req.body.email,
        password: req.body.password
    }

    console.log('==== Login =========================');
    console.log(user);
    console.log('====================================');

    dbutils.GetFromDB({email: user.email}).then(result => {
        
        if (hash('sha256', 'hex', user.password) === result[0].password)
        {
            let token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
            res.json({status: 200, token: token})
        } else {
            res.json({status: 0,token: 0})
        }

    })

})

module.exports = router