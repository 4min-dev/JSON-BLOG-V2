const AlbumModel = require("../models/AlbumModel")
const AlbumPhotosModel = require("../models/AlbumPhotosModel")
const UserModel = require("../models/UserModel")
const fetchImageToServer = require("../utils/fetchImageToServer")
const formatterValidationExpressResult = require("./validation/formatterValidationExpressResult")

class AlbumController {
    async getAlbums(req,res) {
        try {
            const limitQuery = req.query.limit || 20
            const sortQuery = req.query.sort || "albumId:1"
            const searchQuery = req.query.query || ''
            const currPage = req.query.page || 1

            const pagesToSkip = parseInt((currPage - 1) * limitQuery)

            const limit = parseInt(limitQuery)
            const [sortKey,sortValue] = sortQuery.split(':')
            const sort = typeof sortKey === 'string' && !isNaN(sortValue) ? { [sortKey]:parseInt(sortValue,2) } : { "albumId":1 }

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
}

module.exports = new AlbumController()