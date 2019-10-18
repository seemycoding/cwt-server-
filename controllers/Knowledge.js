const Knowledge = require("../models/Knowledge");
let knowledgeq;
const KnowledgeController = {
  index: async (req, res, next) => {
    let knowledge = await Knowledge.find().sort( {sortOrder: 1 } );
    if (req.params.id == 1) {
      knowledgeq = knowledge;
      res.render("pages/know", { data: knowledgeq, message: "" });
    } else {
      res.json(knowledgeq);
    }
  },

  byType: async (req, res, next) => {
    knowledgeQuestions = await Knowledge.find({ type: req.params.type });
    res.json(knowledgeQuestions);
  },
  byId: async (req, res, next) => {
    let question = await Knowledge.findById(req.params.id);
    res.render("pages/addquestion", {
      dat: question,
      url: "/editquestion/" + req.params.id+ "?_method=PUT"
    });
  },
  updateById: async (req, res, next) => {
    let imagePath = [];
    let image = [];
    if (req.files != null) {
      for (let i = 0; i < req.files.length; i++) {
        imagePath.push(req.files[i].path.replace("\\", "/"));
      }
    }
    var know = new Knowledge({
      _id: req.body.id,
      question: req.body.question,
      responseType: req.body.responseType,
      type: req.body.type,
      count: req.body.count,
      option: req.body.option,
      image: imagePath,
      score: req.body.score
    });
    Knowledge.updateOne({ _id: req.params.id }, know)
      .then(result => {
        console.log(result);
        if (result.n > 0) {
          if (req.params.val==1) {
            res.render("pages/know", {
              message: "Question Updated Successfully!",
              data: knowledgeq
            });
          }else{
         
          res.status(200).json({ message: "Question updated Successful!" });
          }
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Could not update question",
          error: error
        });
      });
  },
  deleteById: async (req, res, next) => {
    Knowledge.deleteOne({
      _id: req.params.id
    })
      .then(async result => {
        let knowledge = await Knowledge.find();
        console.log(result);
        if (result.n > 0) {
          if (req.params.val==1) {
            res.render("pages/know", {
              message: "Question Deleted!",
              data: knowledge
            });
          }else{
            res.status(200).json({ message: "Question deleted Successful!" });
          }
         
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Could not delete question",
          error: error
        });
      });
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
      res.render("pages/know", {
        data: knowledgeq,
        message: "Question added successfully"
      });
    }
    res.json(knowledge);
  }
};

module.exports = KnowledgeController;
