const Schema = require("mongoose").Schema;
const dbConnection = require("../config/database");
const highlightSchema = new Schema({
  title: { type: String, required: true },
  link: { type: String, required: true }, //url of article or news
  image: { type: String },
  sortOrder: { type: Number },
  dateAdded: { type: Date },
  dateModified: { type: Date }
});

module.exports = dbConnection.model("Highlight", highlightSchema);
