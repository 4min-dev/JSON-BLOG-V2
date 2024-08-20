const { Router } = require("express");
const AuthController = require("../controller/AuthController");
const AuthorizationMiddleware = require("../middleware/AuthorizationMiddleware");
const multer = require("multer");
const upload = multer()

const authRouter = new Router()

authRouter.post('/signup',upload.single('image'),AuthorizationMiddleware.signUpMiddleware(), AuthController.signUp);
authRouter.post('/signin',AuthorizationMiddleware.signInMiddleware(),AuthController.signIn)
authRouter.get('/signin/verify',AuthController.verifyToLogin)
authRouter.put('/logout',AuthController.logout)
authRouter.get('/getUser/:username',AuthController.getUserByUsername)

module.exports = authRouter