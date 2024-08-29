const TokenModel = require("../models/TokenModel")
const UserModel = require("../models/UserModel")
const TokenService = require("./TokenService")

class AuthorizationService {
    async signUpService(res,newUserData) {

        const username = newUserData.username
        const password = newUserData.hashedPassword
        const email = newUserData.email
        const avatar = newUserData.avatar

        const userData = newUserData.avatar 
            ? { username, password, email, avatar } 
            : { username, password, email }

        const user = new UserModel({...userData, id:Date.now()})

        const personalUserToken = await TokenService.generateToken({userId:user._id})
        const accessToken = new TokenModel({userId:user._id,accessToken:personalUserToken})

        await user.save()
        await accessToken.save()
        return res.status(200).json({username,email})
    }

    async signInService(user,res) {
        const userAccessToken = await TokenModel.findOne({userId:user._id})
        return res
                .cookie('Authorization',`${userAccessToken.accessToken}`)
                .status(200)
                .json({username:user.username,access:userAccessToken.accessToken,avatar:user.avatar})
    }
}

module.exports = new AuthorizationService()