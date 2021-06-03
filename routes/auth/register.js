const express = require('express');
const router = express.Router()

const jwt = require('jsonwebtoken')

const hash = require('../../utils/hash-utils')
const { AddNewUser, GetUser } = require('../../utils/user-db-utils')

const uuid = require('uuid')

router.post('/', function (req, res) {

    // validate email
    let email = req.body.email
    GetUser({ email: email }).then(result => {

        if (result.length) {
            res.json({ status: 0, token: 0 })
        } else {

            let password = req.body.password
            let passwordhash = hash("sha256", "hex", password)

            let user = {
                id: uuid.v4(),
                name: req.body.username,
                password: passwordhash,
                email: email
            }

            AddNewUser(user)

            let tuser = {
                id: user.id,
                email: user.email,
                password: user.password
            }
            let token = jwt.sign(tuser, process.env.ACCESS_TOKEN_SECRET)

            res.json({ status: 200, token: token })
        }
    })


})

module.exports = router