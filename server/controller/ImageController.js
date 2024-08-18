class ImageController {
    async uploadImage(req,res) {
        if (req.file) {
            res.json({image:`http://localhost:3000/${req.file.path}`})
        } else {
            res.status(400).json({ message: 'No file uploaded' });
        }
    }
}

module.exports = new ImageController()