const mongoose = require("mongoose");

const highlightsSchema = mongoose.Schema({
  title: {
    type: String
  },

  image: {
    type: String
  }
});

const highlight = (module.exports = mongoose.model(
  "highlights",
  highlightsSchema
));
