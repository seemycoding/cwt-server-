const UpComingEvent = require("../models/UpComingEvent");
const UpComingEventController = {
  index: async (req, res, next) => {
    const events = await UpComingEvent.find();
    res.json(events);
  },

  create: async (req, res, next) => {
    let receivedDate = req.body.date || '';
    let receivedTitle = req.body.title || '';
    let receivedPlace = req.body.place || '';
    let image = (req.file && req.file.path.replace("\\", "/")) || "";

    const event = await UpComingEvent.create({
      date: receivedDate,
      title: receivedTitle,
      place: receivedPlace,
      image: image.replace("\\", "/")
    });

    res.json(event);
  },

  deleteById: async (req, res, next) => {
    UpComingEvent.deleteOne({
      _id: req.params.id
    }).then(result => {
      console.log(result);
      if(result.n > 0) {
        res.status(200).json({
          message: 'Event Deleted!'
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Could not delete event'
      });
    });
  }
};

module.exports = UpComingEventController;
