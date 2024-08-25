const { Schema, model } = require("mongoose");

const TodoModel = new Schema({
    userId:{type:Schema.Types.ObjectId, ref:'UserModel'},
    id:{type:Number, require:true, unique:true},
    title:{type:String, require:true},
    completed:{type:Boolean, require:true, default:false}
})

module.exports = model('TodoModel', TodoModel)