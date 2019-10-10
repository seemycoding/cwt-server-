const News = require("../models/News");
let newsdata;
const NewsController = {
  index: async (req, res, next) => {
    let news = await News.find();
    if (req.params.id == 1) {
      newsdata = news;
      res.render("pages/News", { data: news, message: "" });
    } else {
      res.json(news);
    }
  },

  byId: async (req, res, next) => {
    let news = await News.findById(req.params.id);
    res.render("pages/addnews", {
      dat: news,
      url: "/editNews/" + req.params.id + "?_method=PUT"
    });
  },

  create: async (req, res, next) => {
    let source = req.body.source || "";
    let date = req.body.date || "";
    let title = req.body.title || "";
    let detail = req.body.detail || "";
    let receivedLink = req.body.link || "";
    let image = (req.file && req.file.path.replace("\\", "/")) || "";
    let link = req.body.link || "";
    let news = await News.create({
      source: source,
      date: date,
      title: title,
      detail: detail,
      link: receivedLink,
      image: image.replace("\\", "/"),
      sortOrder: req.body.sortOrder,
      dateAdded: Date.now(),
      dateModified: Date.now()
    });
    if (req.params.id == 1) {
      res.render("pages/News", {
        data: newsdata,
        message: "News added successfully"
      });
    }
    res.json(news);
  },

  updateById: async (req, res, next) => {
    let image = req.file && req.file.path.replace("\\", "/");
    if (image) {
      image = image.replace("\\", "/");
    }
    var news = new News({
      _id: req.body.id,
      source: req.body.source,
      date: req.body.date,
      title: req.body.title,
      detail: req.body.detail,
      link: req.body.link,
      image: image,
      sortOrder: req.body.sortOrder,
      dateModified: Date.now()
    });
    News.updateOne({ _id: req.params.id }, news)
      .then(result => {
        console.log(result);
        if (result.n > 0) {
          res.render("pages/News", {
            message: "News Updated Successfully!",
            data: newsdata
          });
          // res.status(200).json({ message: "News updated Successfully!" });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Could not update news",
          error: error
        });
      });
  },

  deleteById: async (req, res, next) => {
    News.deleteOne({
      _id: req.params.id
    })
      .then(async result => {
        let news = await News.find();

        console.log(result);

        if (result.n > 0) {
          res.render("pages/News", {
            message: "News Deleted!",
            data: news
          });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Could not delete news"
        });
      });
  }
};
module.exports = NewsController;
