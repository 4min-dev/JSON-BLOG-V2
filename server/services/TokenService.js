const jwt = require('jsonwebtoken')

class TokenService {
    async generateToken(payload) {
        const accessToken = jwt.sign(payload,process.env.SECRET)
        return accessToken
    }
}

module.exports = new TokenService()