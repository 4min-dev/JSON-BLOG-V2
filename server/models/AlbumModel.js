const { Schema, model } = require("mongoose");

const AlbumModel = new Schema({
    title: {type:String, require:true},
    albumId: {type:Number, require:true},
    userId: {type:Schema.Types.ObjectId, ref:'UserModel'},
    photos: [{type:Schema.Types.ObjectId, ref:'AlbumPhotosModel'}]
})

module.exports = model('AlbumModel',AlbumModel)