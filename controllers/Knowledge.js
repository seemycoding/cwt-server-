const Knowledge = require('../models/Knowledge')

const KnowledgeController = {
    byType: async(req, res, next) => {
        knowledgeQuestions = await Knowledge.find({ type: req.params.type })
        res.json(knowledgeQuestions)
    },

    create: async(req, res, next) => {
        let imagePath = [];
        if (req.files != null) {
            for (let i = 0; i < req.files.length; i++) {
                imagePath.push(req.files[i].filename);
            }
        }

        let question = req.body.question || ''
        let responseType = req.body.responseType || ''
        let questionType = req.body.type || ''
        let count = req.body.count || ''
        let option = req.body.option || ''

        let knowledge = await Knowledge.create({
            question: question,
            responseType: responseType,
            questionType: questionType,
            count: count,
            image: imagePath,
            option: option
        });
        res.json(knowledge)
    }
}

module.exports = KnowledgeController