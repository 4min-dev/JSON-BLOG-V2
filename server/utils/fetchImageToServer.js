const FormData = require('form-data')
const fetch = require('node-fetch')

async function fetchImageToServer({image}) {
    const formData = new FormData()
    formData.append('image', image.buffer, image.originalname)

    const response = await fetch('http://localhost:3000/image/upload', {
        method:'POST',
        body:formData,
        headers: formData.getHeaders()
    }).then(res => res.json())

    return response.image
}

module.exports = fetchImageToServer