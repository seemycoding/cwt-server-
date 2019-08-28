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
    let receivedDetail = req.body.detail || '';
    let image = (req.file && req.file.path.replace("\\", "/")) || "";

    const event = await UpComingEvent.create({
      date: receivedDate,
      title: receivedTitle,
      place: receivedPlace,
      detail: receivedDetail,
      image: image.replace("\\", "/"),
      sortOrder: req.body.sortOrder,
      dateAdded: Date.now(),
      dateModified: Date.now()
    });

    res.json(event);
  },

  updateById = async (req, res, next) => {
    let image = (req.file && req.file.path.replace("\\", "/"));
    if(image) {
      image = image.replace("\\", "/");
    }
    var event = new UpComingEvent({
      _id: req.body.id,
      date: req.body.date,
      title: req.body.title,
      place: req.body.place,
      detail: req.body.detail,
      image: image,
      sortOrder: req.body.sortOrder,
      dateModified: Date.now()
    });
    UpComingEvent.updateOne({ _id: req.params.id }, event).then(result => {
      console.log(result);
      if(result.n > 0) {
        res.status(200).json({ message: "Event updated Successfully!"});
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Could not update event',
        error: error
      })
    }); 
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
