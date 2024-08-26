const CommentModel = require("../models/CommentModel");
const PostModel = require("../models/PostModel");
const PostsModel = require("../models/PostModel");
const UserModel = require("../models/UserModel");
const getSortQuery = require("../utils/getSortQuery");
const formatterValidationExpressResult = require("./validation/formatterValidationExpressResult");

class PostsController {
    async getPosts(req,res) {
        try {
            const limitQuery = req.query.limit || 20
            const sortQuery = req.query.sort || "postId:1"
            const searchQuery = req.query.query || ''

            const limit = parseInt(limitQuery)
            const sort = getSortQuery({sortQuery})

            const posts = await PostsModel.aggregate([
                {$match: {title:{$regex:searchQuery, $options: 'i'}}},
                {$addFields:{
                    commentsCount:{$size:"$comments"}
                }},
                {$sort:sort},
                {$limit:limit}
            ])
            const xTotalCount = await PostsModel.countDocuments()

            if(!posts) {
                return res.status(400).json({message:'No posts found'})
            }

            return res.setHeader('x-total-count',xTotalCount).status(200).json({data:posts,headers:res.getHeaders()})
        } catch (error) {
            return res.status(500).json({message:error})
        }
    }

    async getPostById(req,res) {
        try {
            const { postId } = req.params

            const post = await PostsModel.findOne({postId:parseInt(postId)})

            return res.status(200).json(post)
        } catch (error) {
            return res.status(500).json({message:error})
        }
    }

    async newPost(req,res) {
        try {
            const validationResult = formatterValidationExpressResult(req,res)

            if(!validationResult) {
                const { author, title, body, postId } = req.body

                const newPost = new PostModel({postId,title,body,author})

                await UserModel.findOneAndUpdate({username:author},{$push:{posts:newPost._id}})
                await newPost.save()

                return res.status(200).json(newPost)
            }
        } catch (error) {
            return res.status(500).json({message:error})
        }
    }

    async deletePost(req,res) {
        try {
            const { postId } = req.params

            const deletedPost = await PostsModel.findOneAndDelete({postId:postId})
            await UserModel.findOneAndUpdate({username:deletedPost.author}, {$pull: {posts:deletedPost._id}})
            
            return res.status(200).json(deletedPost)
        } catch (error) {
            return res.status(500).json({message:error})
        }
    }

    async changePost(req,res) {
        try {

            const validationResult = formatterValidationExpressResult(req,res)

            if(!validationResult) {
                const { postId } = req.params
                const { title, body } = req.body

                const newPostData = await PostModel.findOneAndUpdate({postId}, {$set: {title:title,body:body}})

                return res.status(200).json(newPostData)
            }
        } catch (error) {
            return res.status(500).json({message:error})
        }
    }
}

module.exports = new PostsController()