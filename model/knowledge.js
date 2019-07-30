const mongoose = require("mongoose");

const knowledgeSchema = mongoose.Schema({
  question: {
    type: String
  },
  responseType: {
    type: String
  },
  count: {
    type: Number
  }
});

const knowledge = (module.exports = mongoose.model(
  "knowledge",
  knowledgeSchema
));
