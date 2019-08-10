const mongoose = require("mongoose");

const newsSchema = mongoose.Schema({
  source: {
    type: String
  },
  date: {
    type: Date
  },
  title: {
    type: String
  },
  detail: {
    type: String
  },
  image: {
    type: String
  }
});

const news = (module.exports = mongoose.model("news", newsSchema));
