const Highlight = require("../models/Highlight");
const Article = require("../models/Article");
const News = require("../models/News");
const imageService =require("../services/image.service");

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
      var passedVariable = req.query.message;
      high = highlights;
      res.render("pages/highlights", { data: highlights, message:passedVariable });
    } else {
      res.json(highlights);
    }
  },

  create: async (req, res, next) => {
    let image = "";
    let receivedTitle = req.body.title;
    let receivedLink = req.body.link;
    if (req.file) {
      image = "/public/uploads/"+req.file.filename || "";
      imageService.convertAllImage(req.file.path);
    }

    let receivedSortOrder = req.body.sortOrder || 0;

    let highlight = await Highlight.create({
      title: receivedTitle,
      link: receivedLink,
      image: image,
      dateAdded: Date.now(),
      dateModified: Date.now(),
      sortOrder: receivedSortOrder
    });
    if (req.params.id == 1) {
     res.redirect('/adminhighlights/1/?message=Highlight item added successfully');
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
      url:
        "/editHighlight/" +
        req.params.id +
        "/" +
        req.params.val +
        "?_method=PUT"
    });
  },
 

  updateById: async (req, res, next) => {
    let image = "";

    if (req.file) {
      image ="/public/uploads/"+req.file.filename || "";
      imageService.convertAllImage(req.file.path);
      

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
      .then(async result => {
        console.log(result);
        if (result.n > 0) {
          if (req.params.val == 1) {
            res.redirect('/adminhighlights/1/?message=Highlight item updated successfully');
          } else {
            res.status(200).json({ message: "Highlight update Successful!" });
          }
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
       
        console.log(result);
        if (result.n > 0) {
          if (req.params.val == 1) {
            res.redirect('/adminhighlights/1/?message=Highlight item deleted successfully');
          } else {
            res.status(200).json({ message: "Highlight deleted Successful!" });
          }
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
