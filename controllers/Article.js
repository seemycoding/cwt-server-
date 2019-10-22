const Article = require("../models/Article");
const path = require("path");
let art;
const ArticleController = {
  expertArticles: async (req, res, next) => {
    let articles = await Article.find({ expert: true });
    if (req.params.id == 1) {
      //console.log(articles[0].title);
      art = articles;
      res.render("pages/Article", { data: articles, message: "" });
    } else {
      res.json(articles);
    }
  },
  index: async (req, res, next) => {
    let articles = await Article.find();
    if (req.params.id == 1) {
      var passedVariable = req.query.message;
    
      res.render("pages/Article", { data: articles, message: passedVariable });
    } else {
      res.json(articles);
    }
  },

  bloggerArticles: async (req, res, next) => {
    let articles = await Article.find({ expert: false });

    res.json(articles);
  },

  byId: async (req, res, next) => {
    let article = await Article.findById(req.params.id);

    if (req.params.val == 1) {
      res.render("pages/addarticle", {
        dat: article,
        url:
          "/editArticle/" +
          req.params.id +
          "/" +
          req.params.val +
          "?_method=PUT"
      });
    } else {
      res.json(article);
    }
  },

  deleteById: async (req, res, next) => {
    Article.deleteOne({
      _id: req.params.id
    })
      .then(async result => {
        if (result.n > 0) {
          if (req.params.val == 1) {
            res.redirect('/adminarticle/1/?message=Articles deleted successfully');
          } else {
            res
              .status(200)
              .json({ message: "article Item deleted Successfully!" });
          }
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Could not delete article"
        });
      });
  },

  create: async (req, res, next) => {
    let simage = "";
    let dimage = "";
    if (typeof req.files.image !== "undefined") {
      simage = req.files["image"][0].path.replace("\\", "/");
    }
    if (typeof req.files.image !== "undefined") {
      dimage = req.files["dimage"][0].path.replace("\\", "/");
    }

    let author = req.body.author || "";
    let profession = req.body.profession || "";
    let articleTitle = req.body.title || "";
    let detail = req.body.detail || "";
    let sauthor = req.body.sauthor || "";
    let sprofession = req.body.sprofession || "";
    let sarticleTitle = req.body.stitle || "";
    let sdetail = req.body.sdetail || "";
    let expert = req.body.expert || "";

    let article = await Article.create({
      author: author,
      profession: profession,
      title: articleTitle,
      sauthor: sauthor,
      sprofession: sprofession,
      stitle: sarticleTitle,
      expert: expert,
      image: simage.replace("\\", "/"),
      dimage: dimage.replace("\\", "/"),
      detail: detail,
      sdetail: sdetail,
      link: req.body.link,
      videoPath: req.body.videoPath,
      sortOrder: req.body.sortOrder,
      dateAdded: Date.now(),
      dateModified: Date.now()
    });
    if (req.params.id == 1) {
     res.redirect('/adminarticle/1/?message=Articles added successfully');
    } else {
      res.json(article);
    }
  },

  updateById: async (req, res, next) => {
    let simage = "";
    let dimage = "";
    if (typeof req.files.image !== "undefined") {
      simage = req.files["image"][0].path.replace("\\", "/");
    }
    if (typeof req.files.image !== "undefined") {
      dimage = req.files["dimage"][0].path.replace("\\", "/");
    }

    var article = new Article({
      _id: req.body.id,
      author: req.body.author,
      profession: req.body.profession,
      title: req.body.title,
      sauthor: req.body.sauthor,
      sprofession: req.body.sprofession,
      stitle: req.body.stitle,
      sdetail: req.body.sdetail,
      detail: req.body.detail,
      expert: req.body.expert,
      image: simage,
      dimage: dimage,
      link: req.body.link,
      videoPath: req.body.videoPath,
      sortOrder: req.body.sortOrder,
      dateModified: Date.now()
    });
    Article.updateOne({ _id: req.params.id }, article)
      .then(async result => {
        if (result.n > 0) {
          if (req.params.val == 1) {
            res.redirect('/adminarticle/1/?message=Articles updated successfully');
          } else {
            res.status(200).json({ message: "Article updated Successfully!" });
          }
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Could not update article",
          error: error
        });
      });
  }
};
module.exports = ArticleController;
