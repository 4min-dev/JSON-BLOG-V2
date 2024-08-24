const { Schema, model } = require("mongoose");

const AlbumPhotosModel = new Schema({
    albumId:{type:Number, require:true},
    title:{type:String, require:true},
    imageUrl:{type:String, require:true}
})

module.exports = model('AlbumPhotosModel',AlbumPhotosModel)