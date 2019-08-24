const Schema = require("mongoose").Schema;
const dbConnection = require('../config/database')
const upcomingEvent = new Schema({
    date: {
        type: String
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