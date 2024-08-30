const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs').promises
const path = require('path')
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
                const user = await UserModel.findOne({username:new RegExp(username, 'i')})
                const isNoUserFound = await AuthorizationServiceValidation.signInServiceValidation(res,{username,password},user)

                if(!isNoUserFound) {
                    await AuthorizationService.signInService(user,res)
                }
            }
            
        } catch (error) {
            return res.status(500).json({message:error})
        }
    }

    async verifyUserByPassword(req,res) {
        try {
            const validationResult = await formatterValidationExpressResult(req,res)

            if(!validationResult) {
                const { userId, password, verifyPassword } = req.body

                if(password !== verifyPassword) {
                    return res.status(400).json({message:'Fields not correctly'})
                }

                const user = await UserModel.findById(userId)

                const isPassword = bcrypt.compareSync(password,user.password)

                if(!isPassword) {
                    return res.status(400).json({message:'Invalid password'})
                }

                return res.status(200).json({isUserVerifyed:isPassword, verifyedUser:{userId:user._id,username:user.username, email:user.email, clientAvatar:user.avatar, password:password}})
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

            const verifyedToken = jwt.verify(accessToken, process.env.SECRET)

            const user = await UserModel.findById(verifyedToken.userId)
            return res.status(200).json({userId:user._id, username:user.username, email:user.email, avatar:user.avatar})
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

            const { _id, ...userWithoutIdLink } = user.toObject()

            return res.status(200).json({...userWithoutIdLink, userId:_id})
        } catch (error) {
            return res.status(500).json({message:error})
        }
    }

    async getUserById(req,res) {
        try {
            const { userId } = req.params
            const user = await UserModel.findById(userId)

            return res.status(200).json(user)
        } catch (error) {
            return res.status(500).json({message:error})
        }
    }

    async changeUserData(req,res) {
        try {
           const validationResult = await formatterValidationExpressResult(req,res)

           if(!validationResult) {
            const { username, password, email } = req.body
            const { userId } = req.params

            const avatar = req.file

            const user = await UserModel.findById(userId)

            const isDataBusy = await AuthorizationServiceValidation.changeUserDataValidation(res,{username, email}, user)
           
            if(!isDataBusy) {

                const isOldPassword = bcrypt.compareSync(password,user.password)
                const hashedPassword = bcrypt.hashSync(password,4)

                let changedUser

                    if(avatar) {
                        if (user.avatar) {
                            try {
                                const pathToOldAvatar = path.resolve(user.avatar.split('/').pop())
                                await fs.unlink(pathToOldAvatar)
                            } catch (err) {
                                console.log(err)
                            }
                        }

                        const urlAvatar = await fetchImageToServer({image:avatar})
                        if(!isOldPassword) {
                            changedUser = await UserModel.findByIdAndUpdate(userId, {$set: {username, password:hashedPassword, email, avatar:urlAvatar}}, {new:true})
                        } else {
                            changedUser = await UserModel.findByIdAndUpdate(userId, {$set: {username, email, avatar:urlAvatar}}, {new:true})
                        }
                    } else {
                        if(!isOldPassword) {
                            changedUser = await UserModel.findByIdAndUpdate(userId, {$set: {username, password:hashedPassword, email}}, {new:true})
                        } else {
                            changedUser = await UserModel.findByIdAndUpdate(userId, {$set: {username, email}}, {new:true})
                        }
                    }

                    return res.status(200).json({
                        email:changedUser.email, 
                        username:changedUser.username, 
                        clientAvatar:changedUser.avatar, 
                        userId:changedUser._id})
                }
           }
            
        } catch (error) {
            return res.status(500).json({message:error})
        }
    }
}

module.exports = new AuthController()