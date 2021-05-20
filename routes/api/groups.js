const express = require('express')
const router = express.Router()

let vdata = [
    {
        name: " Group",
        id: "10h13u901h2b31",
        placement: 4
    },
    {
        name: "Family Group1",
        id: "10h13u901h2b31", 
        placement: 1
    },
    {
        name: "Family Group2",
        id: "10h13u901h2b31",
        placement: 2
    },
]


router.get('/', function(req, res) {
    
    console.log('====================================');
    console.log(req.user);
    console.log('====================================');
    
    res.json({data: vdata})
    
})


module.exports = router