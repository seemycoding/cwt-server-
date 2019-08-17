const Article = require('../models/Article');
const fileUpload = require('../config/fileUpload')

const ArticleController = {

    index: async(req, res, next) => {
        let articles = await Article.find();
        res.json(articles);
    },

    byId: async(req, res, next) => {
        let article = await Article.findById(req.params.id)
        res.json(article);
    },

    create: async(req, res, next) => {
        let name = req.body.auther || '';
        let profession = req.body.profession || '';
        let articleTitle = req.body.title || '';
        let expert = req.body.expert || '';
        let image = (req.file && req.file.filename) || '';

        let article = await Article.create({
            name: name,
            profession: profession,
            title: articleTitle,
            expert: expert,
            image: image,
        })
        res.json(article);
    }
}
module.exports = ArticleController;