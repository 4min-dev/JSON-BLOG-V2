const { Router } = require("express");
const PostsController = require("../controller/PostsController");
const PostsMiddleware = require("../middleware/PostsMiddleware");

const postsRouter = new Router()

postsRouter.get('/getPosts',PostsController.getPosts)
postsRouter.post('/newPost',PostsMiddleware.newPostMiddleware(),PostsController.newPost)

module.exports = postsRouter