const { Schema, model } = require("mongoose");

const TokenModel = new Schema({
    userId:{type:Schema.Types.ObjectId,require:true,unique:true},
    accessToken:{type:String,require:true,unique:true}
})

module.exports = model('TokenModel',TokenModel)