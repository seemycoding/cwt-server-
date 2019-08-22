const Article = require("../models/Article");

const ArticleController = {
  expertArticles: async (req, res, next) => {
    let articles = await Article.find({ expert: true });
    res.json(articles);
  },

  bloggerArticles: async (req, res, next) => {
    let articles = await Article.find({ expert: false });
    res.json(articles);
  },

  byId: async (req, res, next) => {
    let article = await Article.findById(req.params.id);
    res.json(article);
  },

  deleteById: async (req, res, next) => {
    Article.deleteOne({
      _id: req.params.id
    }).then(result => {
      console.log(result);
      if(result.n > 0) {
        res.status(200).json({
          message: 'Article Deleted!'
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Could not delete article'
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
      detail: detail
    });
    res.json(article);
  }
};
module.exports = ArticleController;
