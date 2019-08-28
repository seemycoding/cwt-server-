const Schema = require('mongoose').Schema
const dbConnection = require('../config/database');

const newsSchema = new Schema({
    source: { type: String },
    date: { type: String },
    title: { type: String },
    detail: { type: String },
    image: { type: String },
    link: { type: String},
    sortOrder : { type: Number },
    dateAdded : { type: Date },
    dateModified : { type: Date }
})

module.exports = dbConnection.model('News', newsSchema)