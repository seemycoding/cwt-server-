const Schema = require("mongoose").Schema;
const dbConnection = require("../config/database");
const contactSchema = new Schema({
    name: { type: String },
    mail: { type: String },
    subject: { type: String },
    additional: { type: String },
    organisation: { type: String },
    type:{ type: String }
})

module.exports = dbConnection.model("Contact", contactSchema);
