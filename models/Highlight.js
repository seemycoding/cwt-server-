const Schema = require("mongoose").Schema;
const dbConnection = require("../config/database");
const highlightSchema = new Schema({
    title: { type: String },
    link: { type: String }, //url of article or news
    image: { type: String }
})

module.exports = dbConnection.model("Highlight", highlightSchema);