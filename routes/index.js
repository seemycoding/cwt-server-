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

router.get("/Article", ArticleController.index);
router.get("/Article/:id", ArticleController.byId);
router.post("/Article", fileUpload.single("image"), ArticleController.create);
router.delete("/Article/:id", ArticleController.deleteById);
router.post("/Contact", ContactController.create);
router.get("/News", NewsController.index);
router.get("/News/:id", NewsController.byId);
router.post("/News", fileUpload.single("image"), NewsController.create);

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

module.exports = router;
