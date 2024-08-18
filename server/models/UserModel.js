const { Schema, model } = require("mongoose");

const UserModel = new Schema({
    username:{type:String, require:true, unique:true},
    email:{type:String, require:true, unique:true},
    avatar:{type:String},
    password:{type:String, require:true},
    posts:[{type:Schema.Types.ObjectId, ref:'PostModel'}]
})

module.exports = model('UserModel',UserModel)