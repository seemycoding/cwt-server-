const Schema = require("mongoose").Schema;
const dbConnection = require("../config/database");
const articleSchema = new Schema({
  author: { type: String },
  profession: { type: String },
  title: { type: String },
  detail: { type: String },
  expert: { type: Boolean },
  image: { type: String } //path of image
});

module.exports = dbConnection.model("Article", articleSchema);
