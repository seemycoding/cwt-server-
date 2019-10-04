const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/adminpanel", function(req, res, next) {
  res.render("pages/home", { title: "Clean Water together Admin panel" });
});

router.get("/addarticle", function(req, res, next) {
  res.render("pages/addarticle");
});
router.get("/addquestion", function(req, res, next) {
  res.render("pages/addquestion");
});

router.get("/addnews", function(req, res, next) {
  res.render("pages/addnews");
});

router.get("/know", function(req, res, next) {
  res.render("pages/know");
});

router.get("/about", function(req, res, next) {
  res.render("pages/404");
});

router.get("/users", function(req, res, next) {
  res.render("pages/users");
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
//adminpanel
router.get("/adminarticle/:id", ArticleController.expertArticles);
router.get("/BloggerArticles", ArticleController.bloggerArticles);
router.get("/Article/:id", ArticleController.byId);
router.post("/Article", fileUpload.single("image"), ArticleController.create);
//adminpanel
router.post(
  "/adminArticle/:id",
  fileUpload.single("image"),
  ArticleController.create
);
router.post(
  "/adminNews/:id",
  fileUpload.single("image"),
  NewsController.create
);
//
router.put(
  "/Article/:id",
  fileUpload.single("image"),
  ArticleController.updateById
);
router.delete("/Article/:id", ArticleController.deleteById);

router.get("/News", NewsController.index);
//adminpanel
router.get("/adminnews/:id", NewsController.index);
//
router.get("/News/:id", NewsController.byId);
router.post("/News", fileUpload.single("image"), NewsController.create);
router.put("/News/:id", fileUpload.single("image"), NewsController.updateById);
router.delete("/News/:id", NewsController.deleteById);

router.get("/WaterData/:state", WaterDataController.byState);
router.post("/WaterData", WaterDataController.create);
//adminpanel
router.get("/adminKnowledge/:id", KnowlegdeController.index);
//
router.get("/Knowledge/:type", KnowlegdeController.byType);
router.post(
  "/Knowledge",
  fileUpload.array("image", 3),
  KnowlegdeController.create
);
router.post(
  "/Knowledge/:id",
  fileUpload.array("image", 3),
  KnowlegdeController.create
);

router.get("/UpComingEvent", UpComingEventController.index);
router.post(
  "/UpComingEvent",
  fileUpload.single("image"),
  UpComingEventController.create
);
router.put(
  "/UpcomingEvent/:id",
  fileUpload.single("image"),
  UpComingEventController.updateById
);
router.delete("/UpcomingEvent/:id", UpComingEventController.deleteById);

router.post("/Contact", ContactController.create);

router.get("/Highlights", HighlightController.index);
router.post(
  "/Highlights",
  fileUpload.single("image"),
  HighlightController.create
);
router.put(
  "/Highlights/:id",
  fileUpload.single("image"),
  HighlightController.updateById
);
router.delete("/Highlight/:id", HighlightController.deleteById);

router.get("/Gallery", GalleryController.index);
router.post("/Gallery", fileUpload.single("image"), GalleryController.create);
router.put(
  "/Gallery/:id",
  fileUpload.single("image"),
  GalleryController.updateById
);
router.delete("/Gallery/:id", GalleryController.deleteById);

module.exports = router;
