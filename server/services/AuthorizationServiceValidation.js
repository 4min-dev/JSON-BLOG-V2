const UserModel = require("../models/UserModel")
const bcrypt = require('bcrypt')

class AuthorizationServiceValidation {
    async signUpServiceValidation(res,user) {

        const isUsernameBusy = await UserModel.findOne({username:user.username})
        const isEmailBusy = await UserModel.findOne({email:user.email})
    
        if(isUsernameBusy) {
            return res.status(400).json({message:'Busy username'})
        }
    
        if(isEmailBusy) {
            return res.status(400).json({message:'Busy email'})
        }

    }

    async signInServiceValidation(res,userDataValidation,user) {
        if(!user) {
            return res.status(400).json({message:'No user found'})
        }

        const isPasswordValid = bcrypt.compareSync(userDataValidation.password,user.password)

        if(!isPasswordValid) {
            return res.status(400).json({message:'Invalid password'})
        }

    }
}

module.exports = new AuthorizationServiceValidation()