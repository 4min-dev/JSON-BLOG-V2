const { Schema, model } = require("mongoose");

const AlbumModel = new Schema({
    userId: {type:Schema.Types.ObjectId, ref:'UserModel'},
    albumId: {type:Number, require:true},
    title: {type:String, require:true}
})

module.exports = model('AlbumModel',AlbumModel)