const Highlight = require("../models/Highlight");

const HighlightController = {
  index: async (req, res, next) => {
    let highlights = await Highlight.find();
    res.json(highlights);
  },

  create: async (req, res, next) => {
    let receivedTitle = req.body.title;
    let receivedLink = req.body.link;
    let image = (req.file && req.file.path.replace("\\", "/"));
    let receivedSortOrder = req.body.sortOrder || 0;

    let highlight = await Highlight.create({
      title: receivedTitle,
      link: receivedLink,
      image: image.replace("\\", "/"),
      dateAdded: Date.now(),
      dateUpdated: Date.now(),
      sortOrder: receivedSortOrder
    });
    res.json(highlight);
  },

  updateById: async (req, res, next) => {
    let image = (req.file && req.file.path.replace("\\", "/"));
    var highlight;
    if(image) {
      highlight = new Highlight({
        _id: req.body.id,
        title: req.body.title,
        link: req.body.link,
        image: image,
        sortOrder: req.body.sortOrder,
        dateUpdated: Date.now()
      });
    } else {
      highlight = new Highlight({
        _id: req.body.id,
        title: req.body.title,
        link: req.body.link,
        sortOrder: req.body.sortOrder,
        dateUpdated: Date.now()
      });
    }
    Highlight.updateOne({ _id: req.params.id }, highlight).then(result => {
      console.log(result);
      if(result.n > 0) {
        res.status(200).json({ message: "Highlight update Successful!"});
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Could not update highlight',
        error: error
      })
    });
  },

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
          message: "Could not delete highlight",
          error: error
        });
      });
  }
};

module.exports = HighlightController;
