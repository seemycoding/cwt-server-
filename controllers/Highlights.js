const Highlight = require('../models/Highlight');


const HighlightController = {
    
    index: async(req, res, next) => {
        let highlights = await Highlight.find();
        res.json(highlights);
    },

    create: async(req, res, next) => {

        let receivedTitle = req.body.title || '';
        let receivedLink = req.body.link || '';
        let receivedImagePath = req.body.imagePath || '';

        let highlight = await Highlight.create({
            title: receivedTitle,
            link: receivedLink,
            imagePath: receivedImagePath
        })
        res.json(highlight);
    }
}

module.exports = HighlightController;