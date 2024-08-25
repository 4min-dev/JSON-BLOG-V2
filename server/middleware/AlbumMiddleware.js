const { check } = require("express-validator");

class AlbumMiddleware {
    newAlbumMiddleware() {
        return [
            check('title', 'Title field required').notEmpty(),
            check('albumLogo').custom((value, { req }) => {
                if (!req.file) {
                    throw new Error('Album logo required');
                }
        
                return true
            })
        ]
    }

    newPhotoMiddleware() {
        return [
            check('title','Title field required').notEmpty(),
            check('newImage').custom((value, { req }) => {
                if (!req.file) {
                    throw new Error('Image required');
                }
        
                return true
            })
        ]
    }
}

module.exports = new AlbumMiddleware();
