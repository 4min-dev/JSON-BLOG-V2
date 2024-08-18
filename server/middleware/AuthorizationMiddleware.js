const { check } = require("express-validator");

class AuthorizationMiddleware {
    signUpMiddleware() {
        return [
            check('username','Username cannot be less than 6, but 20 characters long').isLength({min:4,max:25}),
            check('email','Invalid email').isEmail(),
            check('password','Password must be greater than 6 characters').isLength({min:6}),
        ]
    }

    signInMiddleware() {
        return [
            check('username','Username field required').notEmpty(),
            check('password','Password field required').notEmpty()
        ]
    }
}

module.exports = new AuthorizationMiddleware()