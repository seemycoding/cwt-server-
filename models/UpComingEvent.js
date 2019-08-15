const Schema = require("mongoose").Schema;
const dbConnection = require('../config/database')
const upcomingEvent = new Schema({
    datetime: {
        type: Date
    },
    title: {
        type: String
    },
    place: {
        type: String
    },
    image: {
        type: String
    }
});

module.exports = dbConnection.model("upcoming_event", upcomingEvent)