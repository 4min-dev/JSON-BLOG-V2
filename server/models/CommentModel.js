const { Schema, model } = require("mongoose");

const CommentModel = new Schema({
        id:{type:Number, require:true, unique:true, default:Date.now()},
        author:{type:String, require:true},
        body:{type:String, require:true},
        postId:{type:Schema.Types.ObjectId}
})

module.exports = model('CommentModel',CommentModel)