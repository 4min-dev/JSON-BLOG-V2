const { Router } = require("express");
const CommentsMiddleware = require("../middleware/CommentsMiddleware");
const CommentsController = require("../controller/CommentsController");

const commentsRouter = new Router()

commentsRouter.post('/newPostComment', CommentsMiddleware.newCommentMiddleware(), CommentsController.newPostComment)
commentsRouter.get(`/getPostComments/:postId`, CommentsController.getPostComments)
commentsRouter.delete(`/deleteComment/:id`, CommentsController.deleteCommentById)
commentsRouter.put(`/changeComment/:id`, CommentsController.changeCommentById)

module.exports = commentsRouter