const Schema = require('mongoose').Schema;
const dbConnection = require('../config/database')
const waterDataSchema = new Schema({
    state: { type: String },
    city: { type: String },
    parameter: {
        TDS: { type: String },
        NO3: { type: String },
        Flouride: { type: String },
        PHvalue: { type: String }
    },
    latLng: [{ type: Number }]
});
module.exports = dbConnection.model('waterData', waterDataSchema)