const { check, checkExact } = require("express-validator");

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
        ];
    }
}

module.exports = new AlbumMiddleware();
