const Article = require("../models/Article");
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

  bloggerArticles: async (req, res, next) => {
    let articles = await Article.find({ expert: false });

    res.json(articles);
  },

  byId: async (req, res, next) => {
    let article = await Article.findById(req.params.id);

    if (req.params.fid == 1) {
      res.render("pages/addarticle", {
        dat: article,
        url: "/editArticle/" + req.params.id + "?_method=PUT"
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
        let articles = await Article.find({ expert: true });
        console.log(result);
        if (result.n > 0) {
          res.render("pages/Article", {
            message: "Article Deleted!",
            data: articles
          });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Could not delete article"
        });
      });
  },

  create: async (req, res, next) => {
    let author = req.body.author || "";
    let profession = req.body.profession || "";
    let articleTitle = req.body.title || "";
    let expert = req.body.expert || "";
    let detail = req.body.detail || "";
    let image = (req.file && req.file.path.replace("\\", "/")) || "";

    let article = await Article.create({
      author: author,
      profession: profession,
      title: articleTitle,
      expert: expert,
      image: image.replace("\\", "/"),
      detail: detail,
      link: req.body.link,
      videoPath: req.body.videoPath,
      sortOrder: req.body.sortOrder,
      dateAdded: Date.now(),
      dateModified: Date.now()
    });
    if (req.params.id == 1) {
      res.render("pages/Article", { data: art });
    } else {
      res.json(article);
    }
  },

  updateById: async (req, res, next) => {
    let image = req.file && req.file.path.replace("\\", "/");
    if (image) {
      image = image.replace("\\", "/");
    }
    var article = new Article({
      _id: req.body.id,
      author: req.body.author,
      author2: req.body.author2,
      profession: req.body.profession,
      profession2: req.body.profession2,
      title: req.body.title,
      title2: req.body.title2,
      detail: req.body.detail,
      detail2: req.body.detail2,
      expert: req.body.expert,
      image: image,
      image2: image,
      link: req.body.link,
      videoPath: req.body.videoPath,
      sortOrder: req.body.sortOrder,
      dateModified: Date.now()
    });
    Article.updateOne({ _id: req.params.id }, article)
      .then(result => {
        console.log(result);
        if (result.n > 0) {
          res.render("pages/Article", {
            message: "Article Updated Successfully!",
            data: art
          });
          // res.status(200).json({ message: "Article updated Successfully!" });
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
