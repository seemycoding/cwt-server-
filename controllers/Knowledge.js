const Knowledge = require("../models/Knowledge");
let knowledgeq;
const KnowledgeController = {
  index: async (req, res, next) => {
    let knowledge = await Knowledge.find();
    if (req.params.id == 1) {
      knowledgeq = knowledge;
      res.render("pages/know", { data: knowledgeq });
    } else {
      res.json(knowledgeq);
    }
  },

  byType: async (req, res, next) => {
    knowledgeQuestions = await Knowledge.find({ type: req.params.type });
    res.json(knowledgeQuestions);
  },

  create: async (req, res, next) => {
    let imagePath = [];
    let image = [];
    if (req.files != null) {
      for (let i = 0; i < req.files.length; i++) {
        imagePath.push(req.files[i].path.replace("\\", "/"));
      }
    }
    console.log(imagePath);
    let question = req.body.question || "";
    let responseType = req.body.responseType || "";
    let type = req.body.type || "";
    let count = req.body.count || "";
    let option = req.body.option || "";
    let score = req.body.score || "";
    for (let i = 0; i < imagePath.length; i++) {
      image.push(imagePath[i].replace("\\", "/"));
    }

    let knowledge = await Knowledge.create({
      question: question,
      responseType: responseType,
      type: type,
      count: count,
      image: image,
      option: option,
      score: score
    });
    if (req.params.id == 1) {
      res.render("pages/know", { data: knowledgeq });
    }
    res.json(knowledge);
  }
};

module.exports = KnowledgeController;
