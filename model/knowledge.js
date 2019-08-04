const mongoose = require("mongoose");

const knowledgeSchema = mongoose.Schema({
  question: {
    type: String
  },
  responseType: {
    type: String
  },
  type: {
    type: String
  },
  count: {
    type: Number
  },
  image: [
    {
      type: String
    }
  ],
  option: [
    {
      type: String
    }
  ]
});

const knowledge = (module.exports = mongoose.model(
  "knowledge",
  knowledgeSchema
));
