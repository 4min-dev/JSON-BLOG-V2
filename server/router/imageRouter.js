const { Router } = require("express");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now();
        const fileType = file.mimetype.split('/')[1];
        const fileStructure = `${file.fieldname}-${uniqueSuffix}.${fileType}`

        cb(null, fileStructure);
    }
});

const fileFilter = (req, file, cb) => {
    const acceptedFileTypes = /jpeg|png|gif/;
    const fileType = file.mimetype.split('/')[1];

    if (acceptedFileTypes.test(fileType)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });
const ImageController = require("../controller/ImageController");
const imageRouter = new Router()

imageRouter.post('/upload',upload.single('image'),ImageController.uploadImage)

module.exports = imageRouter