const Schema = require("mongoose").Schema;
const dbConnection = require("../config/database");
const gallerySchema = new Schema({
    title: { type: String },
    content: { type: String }, //url of article or news
    imagePath: { type: String },
    videoPath : {  type: String } // path to video file
})

module.exports = dbConnection.model("Gallery", gallerySchema);