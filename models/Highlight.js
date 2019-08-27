const Schema = require("mongoose").Schema;
const dbConnection = require("../config/database");
const highlightSchema = new Schema({
    title: { type: String, required: true },
    link: { type: String, required: true }, //url of article or news
    image: { type: String, required: true },
    sortOrder : { type: Number },
    dateAdded : { type: Date },
    dateUpdated : { type: Date }
})

module.exports = dbConnection.model("Highlight", highlightSchema);