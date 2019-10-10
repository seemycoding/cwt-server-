const Highlight = require("../models/Highlight");
const Article = require("../models/Article");
const News = require("../models/News");
let high;
const HighlightController = {
  selectdata: async (req, res, next) => {
    let artid = await Article.find();
    let newid = await News.find();

    res.render("pages/addhighlight", {
      data: artid,
      data2: newid,
      dat: "",
      url: "/adminHighlights/1"
    });
  },

  index: async (req, res, next) => {
    let highlights = await Highlight.find();
    if (req.params.id == 1) {
      high = highlights;
      res.render("pages/highlights", { data: highlights, message: "" });
    } else {
      res.json(highlights);
    }
  },

  create: async (req, res, next) => {
    let receivedTitle = req.body.title;
    let receivedLink = req.body.link;
    let image = (req.file && req.file.path.replace("\\", "/")) || "";
    let receivedSortOrder = req.body.sortOrder || 0;

    let highlight = await Highlight.create({
      title: receivedTitle,
      link: receivedLink,
      image: image.replace("\\", "/"),
      dateAdded: Date.now(),
      dateModified: Date.now(),
      sortOrder: receivedSortOrder
    });
    if (req.params.id == 1) {
      res.render("pages/highlights", {
        data: high,
        message: "Highlight Updated successfully!"
      });
    } else {
      res.json(highlight);
    }
  },
  byId: async (req, res, next) => {
    let highlight = await Highlight.findById(req.params.id);

    res.render("pages/addhighlight", {
      dat: highlight,
      data: high,
      data2: high,
      url: "/editHighlight/" + req.params.id + "?_method=PUT"
    });
  },

  updateById: async (req, res, next) => {
    let image = req.file && req.file.path.replace("\\", "/");
    if (image) {
      image = image.replace("\\", "/");
    }
    var highlight = new Highlight({
      _id: req.body.id,
      title: req.body.title,
      link: req.body.link,
      image: image,
      sortOrder: req.body.sortOrder,
      dateModified: Date.now()
    });
    Highlight.updateOne({ _id: req.params.id }, highlight)
      .then(result => {
        console.log(result);
        if (result.n > 0) {
          res.render("pages/highlights", {
            message: "Highlight Updated successfully!",
            data: high
          });
          // res.status(200).json({ message: "Highlight update Successful!" });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Could not update highlight",
          error: error
        });
      });
  },

  deleteById: async (req, res, next) => {
    Highlight.deleteOne({
      _id: req.params.id
    })
      .then(async result => {
        let highlights = await Highlight.find();
        console.log(result);
        if (result.n > 0) {
          res.render("pages/highlights", {
            message: "Highlight Deleted!",
            data: highlights
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
