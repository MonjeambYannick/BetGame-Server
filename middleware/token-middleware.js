const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {

    let token = req.headers['authorization']

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) res.send(err)
        req.user = user
    })
    
    next();

}