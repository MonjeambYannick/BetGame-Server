const express = require('express')
const router = express.Router()

const { GetGroup } = require('../../../utils/groups-db-utils')

router.get('/:id', async (req, res) => {

    let id = req.params.id
    console.log(id);

    let response = await GetGroup({ id: id })

    res.json({ data: response[0] })
})

router.get('/:id/get', async (req, res) => {


})


module.exports = router