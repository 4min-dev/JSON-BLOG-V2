const UserModel = require("../models/UserModel")
const bcrypt = require('bcrypt')

class AuthorizationServiceValidation {
    async signUpServiceValidation(res,user) {

        const isUsernameBusy = await UserModel.findOne({username: new RegExp(user.username, 'i')})
        const isEmailBusy = await UserModel.findOne({email: new RegExp(user.email, 'i')})
    
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

    async changeUserDataValidation(res, userDataValidation, user) {
            if(userDataValidation.username != user.username) {
                const isUsernameBusy = await UserModel.findOne({ username: new RegExp(userDataValidation.username, 'i')})

                if(isUsernameBusy) {
                    return res.status(400).json({message:'Busy username'})
                }
            }

            if(userDataValidation.email != user.email) {
                const isEmailBusy = await UserModel.findOne({email: new RegExp(userDataValidation.email, 'i')})

                if(isEmailBusy) {
                    return res.status(400).json({message:'Busy email'})
                }
            }
    }
}

module.exports = new AuthorizationServiceValidation()