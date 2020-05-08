const Gallery = require("../models/Gallery");
const imageService =require("../services/image.service");

const GalleryController = {
  index: async (req, res, next) => {
    let images = await Gallery.find();
    if (req.params.id == 1) {
      var passedVariable = req.query.message;
      res.render("pages/gallery", { data: images, message: passedVariable });
    } else {
      res.json(images);
    }
  },
  byId: async (req, res, next) => {
    let gallery = await Gallery.findById(req.params.id);
    res.render("pages/addgallery", {
      dat: gallery,
      url:
        "/editGallery/" + req.params.id + "/" + req.params.val + "?_method=PUT"
    });
  },

  create: async (req, res, next) => {
    let himage = "";
    let thumbimage = "";

    if (typeof req.files != null) {
      if (req.files["image"] != null) {
        himage = "/public/uploads/"+req.files["image"][0].filename;
        imageService.convertAllImage(req.files["image"][0].path)
      }
    }
    if (typeof req.files != null) {
      if (req.files["thumbimage"] != null) {
        thumbimage ="/public/uploads/"+req.files["thumbimage"][0].filename;
        imageService.convertAllImage(req.files["thumbimage"][0].path)
      }
      
    }
    let receivedTitle = req.body.title || "";
    let receivedContent = req.body.content || "";

    let image = await Gallery.create({
      title: receivedTitle,
      content: receivedContent,
      imagePath: himage,
      thumbimage: thumbimage,
      videoPath: req.body.videoPath,
      sortOrder: req.body.sortOrder
    });
    if (req.params.id == 1) {
      res.redirect("/gallery/1/?message=Gallery item added successfully");
    } else {
      res.json(image);
    }
  },

  updateById: async (req, res, next) => {
    let himage = "";
    let thumbimage = "";

    if (typeof req.files != null) {
      if (req.files["image"] != null) {
        himage = "/public/uploads/"+req.files["image"][0].filename;
        imageService.convertAllImage(req.files["image"][0].path);
        // himage = himage.replace("\\", "/");
      } else {
        simage = await Gallery.find({ _id: req.params.id }, { imagePath: 1 });
      }
    }
    if (typeof req.files != null) {
      if (req.files["thumbimage"] != null) {
        thumbimage ="/public/uploads/"+req.files["thumbimage"][0].filename;
        imageService.convertAllImage(req.files["thumbimage"][0].path);
        // thumbimage = thumbimage.replace("\\", "/");
      } else {
        dimage = await Gallery.find({ _id: req.params.id }, { thumbimage: 1 });
      }
    }
    var galleryItem = new Gallery({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      imagePath: himage,
      thumbimage: thumbimage,
      videoPath: req.body.videoPath,
      sortOrder: req.body.sortOrder
    });
    Gallery.updateOne({ _id: req.params.id }, galleryItem)
      .then(async result => {
        console.log(result);
        if (result.n > 0) {
          if (req.params.val == 1) {
            res.redirect(
              "/gallery/1/?message=Gallery item updated successfully"
            );
          } else {
            res
              .status(200)
              .json({ message: "Gallery Item updated Successfully!" });
          }
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
        console.log(result);
        if (result.n > 0) {
          if (req.params.val == 1) {
            res.redirect(
              "/gallery/1/?message=Gallery item deleted successfully"
            );
          } else {
            res
              .status(200)
              .json({ message: "Gallery Item deleted Successfully!" });
          }
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
