const crypto = require('crypto');

function hash(alg, digest, data) {
    return crypto.createHash(alg).update(data).digest(digest)
}

module.exports =  hash;