const UpComingEvent = require("../models/UpComingEvent");
let eventdata;
const UpComingEventController = {
  index: async (req, res, next) => {
    const events = await UpComingEvent.find();
    if (req.params.id == 1) {
      eventdata = events;
      res.render("pages/upcomingevent", { data: events, message: "" });
    } else {
      res.json(events);
    }
  },

  create: async (req, res, next) => {
    let receivedDate = req.body.date || "";
    let receivedTitle = req.body.title || "";
    let receivedPlace = req.body.place || "";
    let receivedDetail = req.body.detail || "";
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
    if (req.params.id == 1) {
      const events = await UpComingEvent.find();
      res.render("pages/upcomingevent", {
        data: events,
        message: "Event added successfully"
      });
    } else {
      res.json(event);
    }
  },
  byId: async (req, res, next) => {
    let event = await UpComingEvent.findById(req.params.id);
    res.render("pages/addevent", {
      dat: event,
      url: "/editEvent/" + req.params.id + "/" + req.params.val + "?_method=PUT"
    });
  },

  updateById: async (req, res, next) => {
    let image = req.file && req.file.path.replace("\\", "/");
    if (image) {
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
    UpComingEvent.updateOne({ _id: req.params.id }, event)
      .then(async result => {
        console.log(result);
        if (result.n > 0) {
          if (req.params.val == 1) {
            const events = await UpComingEvent.find();
            res.render("pages/upcomingevent", {
              message: "Event Updated successfully!",
              data: events
            });
          } else {
            res.status(200).json({ message: "Event updated Successfully!" });
          }

          //
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Could not update event",
          error: error
        });
      });
  },

  deleteById: async (req, res, next) => {
    UpComingEvent.deleteOne({
      _id: req.params.id
    })
      .then(async result => {
        console.log(result);
        if (result.n > 0) {
          if (req.params.val == 1) {
            const events = await UpComingEvent.find();
            res.render("pages/upcomingevent", {
              message: "Event Deleted!",
              data: events
            });
          } else {
            res.status(200).json({ message: "Event deleted Successfully!" });
          }
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Could not delete event"
        });
      });
  }
};

module.exports = UpComingEventController;
