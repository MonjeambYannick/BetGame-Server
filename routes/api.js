const express = require('express')
const router = express.Router()

const groups = require('./api/groups')

router.use('/groups', groups)

module.exports = router