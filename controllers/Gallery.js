const Gallery = require('../models/Gallery');


const GalleryController = {
    
    index: async(req, res, next) => {
        let images = await Gallery.find();
        res.json(images);
    },

    create: async(req, res, next) => {

        let receivedTitle = req.body.title || '';
        let receivedContent = req.body.content || '';
        let receivedImagePath = (req.file && req.file.path.replace("\\", "/")) || "";

        let image = await Gallery.create({
            title: receivedTitle,
            content: receivedContent,
            imagePath: receivedImagePath.replace("\\", "/")
        })
        res.json(image);
    },

    deleteById: async (req, res, next) => {
        Gallery.deleteOne({
          _id: req.params.id
        }).then(result => {
          console.log(result);
          if(result.n > 0) {
            res.status(200).json({
              message: 'Image Deleted!'
            });
          }
        })
        .catch(error => {
          res.status(500).json({
            message: 'Could not delete Image'
          });
        });
      }
}

module.exports = GalleryController;