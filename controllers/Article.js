const Article = require("../models/Article");

const ArticleController = {
  index: async (req, res, next) => {
    let articles = await Article.find();
    res.json(articles);
  },

  byId: async (req, res, next) => {
    let article = await Article.findById(req.params.id);
    res.json(article);
  },
  deleteById: async (req, res, next) => {
    let article = await Article.findById(req.params.id);
    let isDeleted = await article.remove();
    res.json(isDeleted);
  },
  create: async (req, res, next) => {
    let name = req.body.auther || "";
    let profession = req.body.profession || "";
    let articleTitle = req.body.title || "";
    let expert = req.body.expert || "";
    let detail = req.body.detail || "";
    let image = (req.file && req.file.path.replace("\\", "/")) || "";

    let article = await Article.create({
      name: name,
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
