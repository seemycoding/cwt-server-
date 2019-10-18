const Schema = require("mongoose").Schema;
const dbConnection = require("../config/database");
const articleSchema = new Schema({
  author: { type: String },
  profession: { type: String },
  title: { type: String },
  detail: { type: String },
  sauthor: { type: String },
  sprofession: { type: String },
  stitle: { type: String },
  detail: { type: String },
  expert: { type: Boolean },
  image: { type: String },
  dimage:{type:String},
  link: { type: String },
  videoPath: { type: String }, // path to the video, if any
  sortOrder: { type: Number },
  dateAdded: { type: Date },
  dateModified: { type: Date }
});

module.exports = dbConnection.model("Article", articleSchema);
