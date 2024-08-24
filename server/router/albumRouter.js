const { Router } = require("express");
const AlbumController = require('../controller/AlbumController')

const albumRouter = new Router()

albumRouter.get('/getAlbums', AlbumController.getAlbums)
albumRouter.get(`/getPhotos/:albumId`, AlbumController.getPhotos)

module.exports = albumRouter