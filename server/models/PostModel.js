const { Schema, model } = require("mongoose");

const PostModel = new Schema({
    postId:{type: Number, require:true, unique:true, default:Date.now() },
    author:{type:String, require:true},
    title:{type:String, require:true},
    body:{type:String, require:true},
    comments:[{type:Schema.Types.ObjectId, ref:'CommentModel'}]
})

module.exports = model('PostModel',PostModel)