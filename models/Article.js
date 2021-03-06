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
  sdetail: { type: String },
  expert: { type: Boolean },
  image: { type: String },
  dimage:{type:String},
  isEnabled:{type:Boolean},
  isVideo:{type:String},
  link: { type: String },
  videoPath: { type: String }, // path to the video, if any
  sortOrder: { type: Number },
  dateAdded: { type: Date },
  dateModified: { type: Date },
  metaTag:{type:String}
});

module.exports = dbConnection.model("Article", articleSchema);
