const express = require('express')
const router = express.Router()

const { AddGroup, GetGroup, FindAndUpdateGroup, AddUserToGroup } = require('../../utils/groups-db-utils')
const { AddNewUser, GetUser } = require('../../utils/user-db-utils')

const uuid = require('uuid')

router.get('/', async (req, res) => {

    console.log(req.user.id);

    let groups = await GetGroup({ users: { $elemMatch: { id: req.user.id } } })

    console.log('====================================');
    console.log(groups);
    console.log('====================================');

    res.json({ data: groups })
})

router.post('/create', (req, res) => {

    let name = req.body.name;
    let users = []
    let id = uuid.v4()

    users.push({ id: req.user.id })

    AddGroup({ name: name, id: id, users: users })

    res.json({ status: 200, id: id })
})

router.post('/join', (req, res) => {

    let user_id = req.user.id
    let group_id = req.body.group_id

    AddUserToGroup(group_id, user_id)

    res.json({ status: 200 })
})

module.exports = router