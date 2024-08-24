const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const formatterValidationExpressResult = require("./validation/formatterValidationExpressResult")
const AuthorizationServiceValidation = require("../services/AuthorizationServiceValidation")
const AuthorizationService = require("../services/AuthorizationService")
const UserModel = require('../models/UserModel')
const fetchImageToServer = require('../utils/fetchImageToServer')

class AuthController {
    async signUp(req,res) {
        try {
            const { username, password, email } = req.body
            const avatar = req.file

            const userDataFieldsValidation = await formatterValidationExpressResult(req,res)

            if(!userDataFieldsValidation) {
                const isDataBusy = await AuthorizationServiceValidation.signUpServiceValidation(res,{username,email})

                if(!isDataBusy) {

                    const hashedPassword = bcrypt.hashSync(password,4)

                    if(avatar) {
                        const urlAvatar = await fetchImageToServer({image:avatar})
    
                        await AuthorizationService.signUpService(res,{username,hashedPassword,email,avatar:urlAvatar})
                       } else {
                        await AuthorizationService.signUpService(res,{username,hashedPassword,email})
                    }
                }
            }

        } catch (error) {
            return res.status(500).json({message:error})
        }
    }

    async signIn(req,res) {
        try {
            const { username,password } = req.body
            const userDataFieldsValidation = await formatterValidationExpressResult(req,res)

            if(!userDataFieldsValidation) {
                const user = await UserModel.findOne({username})
                const isNoUserFound = await AuthorizationServiceValidation.signInServiceValidation(res,{username,password},user)

                if(!isNoUserFound) {
                    await AuthorizationService.signInService(user,res)
                }
            }
            
        } catch (error) {
            return res.status(500).json({message:error})
        }
    }

    async verifyToLogin(req,res) {
       try {
            const accessToken = req.cookies.Authorization

            if(!accessToken) {
                return res.status(400).json({message:'No access'})
            }

            const user = jwt.verify(accessToken,process.env.SECRET)
            return res.status(200).json(user)
       } catch (error) {
            return res.status(500).json({message:error})
       }
    }

    async logout(req,res) {
        try {
            res.clearCookie('Authorization')
            return res.status(200).json({message:'Successfully logout'})
        } catch (error) {
            return res.status(500).json({message:error})
        }
    }

    async getUserByUsername(req,res) {
        try {
            const { username } = req.params

            const user = await UserModel.findOne({username:username})

            return res.status(200).json(user)
        } catch (error) {
            return res.status(500).json({message:error})
        }
    }
    }

module.exports = new AuthController()