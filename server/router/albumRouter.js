const { Router } = require("express");
const AlbumController = require('../controller/AlbumController');
const AlbumMiddleware = require("../middleware/AlbumMiddleware");
const multer = require('multer')
const upload = multer()

const albumRouter = new Router()

albumRouter.get('/getAlbums', AlbumController.getAlbums)
albumRouter.get(`/getPhotos/:albumId`, AlbumController.getPhotos)
albumRouter.post('/addNewAlbum', upload.single('albumLogo'),AlbumMiddleware.newAlbumMiddleware(), AlbumController.newAlbum)

module.exports = albumRouter