const express = require('express')
const router = express.Router()

const login = require('./auth/login')
const register = require('./auth/register')

router.use('/login', login)
router.use('/register', register)

module.exports = router