const Schema = require("mongoose").Schema;
const dbConnection = require("../config/database");
const gallerySchema = new Schema({
    title: { type: String },
    content: { type: String }, //url of article or news
    imagePath: { type: String }
})

module.exports = dbConnection.model("Gallery", gallerySchema);