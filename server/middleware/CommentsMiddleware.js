const { check } = require("express-validator");

class CommentsMiddleware {
    newCommentMiddleware() {
        return [
            check('body','Body field required').notEmpty()
        ]
    }
}

module.exports = new CommentsMiddleware()