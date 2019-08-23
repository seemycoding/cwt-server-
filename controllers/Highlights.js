const Highlight = require("../models/Highlight");

const HighlightController = {
  index: async (req, res, next) => {
    let highlights = await Highlight.find();
    res.json(highlights);
  },

<<<<<<< HEAD
  create: async (req, res, next) => {
    let receivedTitle = req.body.title || "";
    let receivedLink = req.body.link || "";
    let receivedImagePath = req.file.path.replace("\\", "/") || "";

    let highlight = await Highlight.create({
      title: receivedTitle,
      link: receivedLink,
      imagePath: receivedImagePath.replace("\\", "/")
    });
    res.json(highlight);
  },
=======
        let receivedTitle = req.body.title || '';
        let receivedLink = req.body.link || '';
        let image = (req.file && req.file.path.replace("\\", "/")) || "";

        let highlight = await Highlight.create({
            title: receivedTitle,
            link: receivedLink,
            image: image.replace("\\", "/"),
        })
        res.json(highlight);
    },
>>>>>>> d5f16222ad5a073490ab91fa53d34196d3eb4600

  deleteById: async (req, res, next) => {
    Highlight.deleteOne({
      _id: req.params.id
    })
      .then(result => {
        console.log(result);
        if (result.n > 0) {
          res.status(200).json({
            message: "Highlight Deleted!"
          });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Could not delete highlight"
        });
      });
  }
};

module.exports = HighlightController;
