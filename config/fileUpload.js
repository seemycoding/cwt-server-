const multer = require('multer')

const storage = multer.diskStorage({
    destination: async(req, file, callback) => {
        console.log(file);
        callback(null, '../public/uploads')
    },
})

const fileFilter = async(req, file, callback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image.jpeg')
        callback(null, true)
    else
        callback(null, false)
}

module.exports = multer({ storage: storage, fileFilter: fileFilter })