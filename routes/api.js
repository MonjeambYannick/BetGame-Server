const express = require('express')
const router = express.Router()

const groups = require('./api/groups')
const group = require('./api/group/group')

router.use('/groups', groups)

router.use('/', group)

module.exports = router