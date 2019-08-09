const mongoose = require("mongoose");

const articleSchema = mongoose.Schema({
  name: {
    type: String
  },
  profession: {
    type: String
  },
  title: {
    type: String
  },
  detail: {
    type: String
  },
  expert: {
    type: Boolean
  },
  image: {
    type: String
  }
});

const article = (module.exports = mongoose.model("article", articleSchema));
