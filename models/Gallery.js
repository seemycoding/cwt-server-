const Schema = require("mongoose").Schema;
const dbConnection = require("../config/database");
const gallerySchema = new Schema({
  title: { type: String },
  content: { type: String }, //url of article or news
  imagePath: { type: String },
  thumbimage: { type: String },
  videoPath: { type: String }, // path to video file
  sortOrder:{type:Number}
});

module.exports = dbConnection.model("Gallery", gallerySchema);
