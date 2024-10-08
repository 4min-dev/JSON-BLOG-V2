const AlbumModel = require("../models/AlbumModel")
const AlbumPhotosModel = require("../models/AlbumPhotosModel")
const UserModel = require("../models/UserModel")
const fetchImageToServer = require("../utils/fetchImageToServer")
const getPagination = require("../utils/getPagination")
const getSortQuery = require("../utils/getSortQuery")
const formatterValidationExpressResult = require("./validation/formatterValidationExpressResult")

class AlbumController {
    async getAlbums(req,res) {
        try {
            const limitQuery = req.query.limit || 20
            const sortQuery = req.query.sort || "albumId:1"
            const searchQuery = req.query.query || ''
            const currPage = req.query.page || 1

            const pagesToSkip = await getPagination({currPage, limitQuery})

            const limit = parseInt(limitQuery)
            const sort = await getSortQuery(sortQuery)

            const albums = await AlbumModel.aggregate([
                {$match: {title:{$regex:searchQuery, $options: 'i'}}},
                {$skip:pagesToSkip},
                {$sort:sort},
                {$limit:limit}
            ])

            const xTotalCount = await AlbumModel.countDocuments()

            return res.setHeader('x-total-count',xTotalCount).status(200).json({data:albums,headers:res.getHeaders()})
        } catch (error) {
            return res.status(500).json({message:error})
        }
    }

    async getPhotos(req,res) {
        try {
            const { albumId } = req.params

            const photos = await AlbumPhotosModel.find({albumId:parseInt(albumId)})

            return res.status(200).json(photos)
        } catch (error) {
            return res.status(500).json({message:error})
        }
    }

    async newAlbum(req,res) {
        try {
            const { title, albumId, userId } = req.body
            const albumLogo = req.file

            const validationResult = formatterValidationExpressResult(req,res)

            if(!validationResult) {

               const albumAuthor = await UserModel.findById(userId)
               
               const imageUrl = await fetchImageToServer({image:albumLogo})

               const newAlbum = new AlbumModel({albumId, title, userId:albumAuthor._id})
               const firstAlbumImage = new AlbumPhotosModel({albumId:newAlbum.albumId, imageUrl, title:`${title} album logo`})

               await newAlbum.save()
               await firstAlbumImage.save()

                return res.status(200).json(newAlbum)
            }

        } catch (error) {
            return res.status(500).json({message:error})
        }
    }

    async newPhoto(req,res) {
        try {
            const validationResult = formatterValidationExpressResult(req,res)

            if(!validationResult) {
                const { title, albumId } = req.body
                const newImage = req.file

                const imageUrl = await fetchImageToServer({image:newImage})
                const newPhoto = new AlbumPhotosModel({albumId:parseInt(albumId),title:title,imageUrl:imageUrl})
                await newPhoto.save()

                return res.status(200).json(newPhoto)
            }
        } catch (error) {
            return res.status(500).json({message:error})
        }
    }
}

module.exports = new AlbumController()