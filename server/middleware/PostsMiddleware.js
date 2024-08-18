const { check } = require("express-validator");

class PostsMiddleware {
    newPostMiddleware() {
        return [
            check('title','Title field required').notEmpty(),
            check('body','Description field required').notEmpty(),
        ]
    }
}

module.exports = new PostsMiddleware()