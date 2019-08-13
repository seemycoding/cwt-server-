const mongoose = require("mongoose");

const upcomingEvent = mongoose.Schema({
  date: {
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

const ucevent = (module.exports = mongoose.model("ucevent", upcomingEvent));
