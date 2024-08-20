const { Router } = require("express");
const PostsController = require("../controller/PostsController");
const PostsMiddleware = require("../middleware/PostsMiddleware");

const postsRouter = new Router()

postsRouter.get('/getPosts',PostsController.getPosts)
postsRouter.get(`/getPost/:postId`,PostsController.getPostById)
postsRouter.post('/newPost',PostsMiddleware.newPostMiddleware(),PostsController.newPost)
postsRouter.delete(`/deletePost/:postId`,PostsController.deletePost)
postsRouter.put(`/changePost/:postId`,PostsMiddleware.newPostMiddleware(),PostsController.changePost)

module.exports = postsRouter