const Schema = require('mongoose').Schema;
const dbConnection = require('../config/database')
const knwoledgeSchema = new Schema({
    question: { type: String },
    responseType: { type: String },
    questionType: { type: String },
    count: { type: Number },
    option: [{ type: String }],
    image: [{ type: String }]
})

module.exports = dbConnection.model('Knowledge', knwoledgeSchema)