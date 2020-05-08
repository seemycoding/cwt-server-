const UpComingEvent = require("../models/UpComingEvent");
const imageService =require("../services/image.service");

let eventdata;
const UpComingEventController = {
  index: async (req, res, next) => {
    const events = await UpComingEvent.find().sort({_id:-1});
    if (req.params.id == 1) {
      var passedVariable = req.query.message;
      eventdata = events;
      res.render("pages/upcomingevent", { data: events, message:passedVariable });
    } else {
      res.json(events);
    }
  },

  create: async (req, res, next) => {
    let imagepath="";
    if (req.file) {
     imagepath = "/public/uploads/"+req.file.filename+".webp";
     imageService.convertAllImage(req.file.path);
    // if (image) {
    //   image = image.replace("\\", "/");
    // }
    
      
    }
    let receivedDate = req.body.date || "";
    let receivedTitle = req.body.title || "";
    let receivedPlace = req.body.place || "";
    let receivedDetail = req.body.detail || "";
    let image = imagepath || "";

    const event = await UpComingEvent.create({
      date: receivedDate,
      title: receivedTitle,
      place: receivedPlace,
      detail: receivedDetail,
      image: image,
      sortOrder: req.body.sortOrder,
      dateAdded: Date.now(),
      dateModified: Date.now()
    });
    if (req.params.id == 1) {
     res.redirect('/events/1/?message=Event added successfully');
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

    let imagepath="";
    if (req.file) {
     imagepath = "/public/uploads/"+req.file.filename+".webp";
     imageService.convertAllImage(req.file.path);
    // if (image) {
    //   image = image.replace("\\", "/");
    // }
    
      
    }
    var event = new UpComingEvent({
      _id: req.body.id,
      date: req.body.date,
      title: req.body.title,
      place: req.body.place,
      detail: req.body.detail,
      image: imagepath,
      sortOrder: req.body.sortOrder,
      dateModified: Date.now()
    });
    UpComingEvent.updateOne({ _id: req.params.id }, event)
      .then(async result => {
        console.log(result);
        if (result.n > 0) {
          if (req.params.val == 1) {
            res.redirect('/events/1/?message=Event updated successfully');
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
            res.redirect('/events/1/?message=Event deleted successfully');
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
