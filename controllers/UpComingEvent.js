const UpComingEvent = require("../models/UpComingEvent");
const UpComingEventController = {
  index: async (req, res, next) => {
    const events = await UpComingEvent.find();
    res.json(events);
  },

  create: async (req, res, next) => {
    const datetime = req.body.datetime;
    const title = req.body.title;
    const place = req.body.place;
    const image = req.file.path.replace("\\", "/");

    const event = await UpComingEvent.create({
      datetime: datetime,
      title: title,
      place: place,
      image: image.replace("\\", "/")
    });

    res.json(event);
  }
};

module.exports = UpComingEventController;
