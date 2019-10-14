const Gallery = require("../models/Gallery");

const GalleryController = {
  index: async (req, res, next) => {
    let images = await Gallery.find();
    if (req.params.id == 1) {
      res.render("pages/gallery", { data: images, message: "" });
    } else {
      res.json(images);
    }
  },
  byId: async (req, res, next) => {
    let gallery = await Gallery.findById(req.params.id);
    res.render("pages/addgallery", {
      dat: gallery,
      url: "/Gallery/" + req.params.id + "?_method=PUT"
    });
  },

  create: async (req, res, next) => {
    let receivedTitle = req.body.title || "";
    let receivedContent = req.body.content || "";
    let receivedImagePath =
      (req.file && req.file.path.replace("\\", "/")) || "";

    let receivedthumbImagePath =
      (req.file && req.file.path.replace("\\", "/")) || "";

    let image = await Gallery.create({
      title: receivedTitle,
      content: receivedContent,
      imagePath: receivedImagePath.replace("\\", "/"),
      thumbimagepath: receivedthumbImagePath,
      videoPath: req.body.videoPath
    });
    if (req.params.id == 1) {
      let images = await Gallery.find();
      res.render("pages/gallery", {
        data: images,
        message: "Image/Video added successfully"
      });
    } else {
      res.json(image);
    }
  },

  updateById: async (req, res, next) => {
    let image = req.file && req.file.path.replace("\\", "/");
    if (image) {
      image = image.replace("\\", "/");
    }

    var galleryItem = new Gallery({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      imagePath: image,
      videoPath: req.body.videoPath
    });
    Gallery.updateOne({ _id: req.params.id }, galleryItem)
      .then(result => {
        console.log(result);
        if (result.n > 0) {
          res
            .status(200)
            .json({ message: "Gallery Item updated Successfully!" });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Could not update gallery Item",
          error: error
        });
      });
  },

  deleteById: async (req, res, next) => {
    Gallery.deleteOne({
      _id: req.params.id
    })
      .then(async result => {
        let images = await Gallery.find();
        console.log(result);
        if (result.n > 0) {
          res.render("pages/gallery", {
            message: "Gallery item Deleted!",
            data: images
          });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Could not delete Gallery Item"
        });
      });
  }
};

module.exports = GalleryController;
