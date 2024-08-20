const CommentModel = require("../models/CommentModel")
const PostModel = require("../models/PostModel")
const formatterValidationExpressResult = require("./validation/formatterValidationExpressResult")

class CommentsController {
    async newPostComment(req,res) {
        try {
            const { id, author, body, postId } = req.body

            const validationResult = formatterValidationExpressResult(req,res)

            if(!validationResult) {

                const post = await PostModel.findOne({postId:parseInt(postId)})
                const newComment = await CommentModel.create({id,author,body,postId:post._id})
                await PostModel.findOneAndUpdate({_id:post._id}, {$push: {comments:newComment._id}})

                return res.status(200).json(newComment)
            }
        } catch (error) {
            return res.status(500).json({message:error})
        }
    }

    async getPostComments(req,res) {
        try {
            const { postId } = req.params

            const post = await PostModel.findOne({postId:parseInt(postId)})
            const postComments = await CommentModel.find({postId:post._id})

            return res.status(200).json(postComments)
        } catch (error) {
            return res.status(500).json({message:error})
        }
    }

    async deleteCommentById(req,res) {
        try {
            const { id } = req.params

            const deletedComment = await CommentModel.findOneAndDelete({id:parseInt(id)})
            
            const post = await PostModel.findOneAndUpdate({_id:deletedComment.postId},{$pull: {comments: deletedComment._id}})

            return res.status(200).json(deletedComment)
        } catch (error) {
            return res.status(500).json({message:error})
        }
    }б

    async changeCommentById(req,res) {
        try {
            const { id } = req.params
            const { body } = req.body

            const changedComment = await CommentModel.findOneAndUpdate({id:parseInt(id)}, {$set: {body:body}})

            return res.status(200).json(changedComment)
        } catch (error) {
            
        }
    }
}

module.exports = new CommentsController()