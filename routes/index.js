const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

const fileUpload = require("../config/fileUpload");

const ArticleController = require("../controllers/Article");
const NewsController = require("../controllers/News");
const WaterDataController = require("../controllers/WaterData");
const ContactController = require("../controllers/ContactUs");
const KnowlegdeController = require("../controllers/Knowledge");
const UpComingEventController = require("../controllers/UpComingEvent");
const HighlightController = require("../controllers/Highlights");
const GalleryController = require("../controllers/Gallery");

router.get("/ExpertArticles", ArticleController.expertArticles);
router.get("/BloggerArticles", ArticleController.bloggerArticles);
router.get("/Article/:id", ArticleController.byId);
router.post("/Article", fileUpload.single("image"), ArticleController.create);
router.delete("/Article/:id", ArticleController.deleteById);

router.get("/News", NewsController.index);
router.get("/News/:id", NewsController.byId);
router.post("/News", fileUpload.single("image"), NewsController.create);
router.delete("/News/:id", NewsController.deleteById);

router.get("/WaterData/:state", WaterDataController.byState);
router.post("/WaterData", WaterDataController.create);

router.get("/Knowledge/:type", KnowlegdeController.byType);
router.post(
  "/Knowledge",
  fileUpload.array("image", 3),
  KnowlegdeController.create
);

router.get("/UpComingEvent", UpComingEventController.index);
router.post("/UpComingEvent", UpComingEventController.create);
router.delete("/UpcomingEvent/:id", UpComingEventController.deleteById);

router.post("/Contact", ContactController.create);

router.get("/Highlights", HighlightController.index);
router.post(
  "/Highlight",
  fileUpload.single("image"),
  HighlightController.create
);
router.delete("/Highlight/:id", HighlightController.deleteById);

router.get("/Gallery", GalleryController.index);
router.post("/Gallery", fileUpload.single("image"), GalleryController.create);
router.delete("/Gallery/:id", GalleryController.deleteById);
module.exports = router;
