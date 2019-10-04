const Schema = require("mongoose").Schema;
const dbConnection = require("../config/database");
const articleSchema = new Schema({
  author: { type: String },
  author2: { type: String },
  profession: { type: String },
  profession2: { type: String },
  title: { type: String },
  title2: { type: String },
  detail: { type: String },
  detail2: { type: String },
  expert: { type: Boolean },
  image: { type: String },
  image2: { type: String }, // path of image
  link: { type: String },
  videoPath: { type: String }, // path to the video, if any
  sortOrder: { type: Number },
  dateAdded: { type: Date },
  dateModified: { type: Date }
});

module.exports = dbConnection.model("Article", articleSchema);
