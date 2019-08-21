const News = require("../models/News");

const NewsController = {
  index: async (req, res, next) => {
    let news = await News.find();
    res.json(news);
  },
  byId: async (req, res, next) => {
    let news = await News.findById(req.params.id);
    res.json(news);
  },
  create: async (req, res, next) => {
    let source = req.body.source || "";
    let date = req.body.date || "";
    let title = req.body.title || "";
    let detail = req.body.detail || "";
    let image = (req.file && req.file.path.replace("\\", "/")) || "";

    let news = await News.create({
      source: source,
      date: date,
      title: title,
      detail: detail,
      image: image.replace("\\", "/")
    });
    res.json(news);
  }
};
module.exports = NewsController;
