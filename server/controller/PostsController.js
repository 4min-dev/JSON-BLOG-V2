const PostModel = require("../models/PostModel");
const PostsModel = require("../models/PostModel");
const UserModel = require("../models/UserModel");
const formatterValidationExpressResult = require("./validation/formatterValidationExpressResult");

class PostsController {
    async getPosts(req,res) {
        try {
            const limitQuery = req.query.limit || 20
            const sortQuery = req.query.sort || "postId:1"
            const searchQuery = req.query.query || ''

            const limit = parseInt(limitQuery)
            const [sortKey,sortValue] = sortQuery.split(':')
            const sort = typeof sortKey === 'string' && !isNaN(sortValue) ? { [sortKey]:parseInt(sortValue,2) } : { "postId":1 }

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
            console.log(error)
            return res.status(500).json({message:error})
        }
    }

    async newPost(req,res) {
        const validationResult = formatterValidationExpressResult(req,res)

        if(!validationResult) {
            const { author, title, body, postId } = req.body

            const newPost = new PostModel({postId,title,body,author})

            await UserModel.findOneAndUpdate({username:author},{$push:{posts:newPost._id}})
            await newPost.save()

            return res.status(200).json(newPost)
        }
    }

    async deletePost(req,res) {
        try {
            const { id } = req.body

            const deletedPost = await PostsModel.findOneAndDelete({postId:id})
            
            return res.status(200).json({message:`${deletedPost.title} was deleted`})
        } catch (error) {
            return res.status(500).json({message:error})
        }
    }
}

module.exports = new PostsController()