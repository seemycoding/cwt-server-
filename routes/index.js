const express = require("express");
const router = express.Router();
const methodOverride = require("method-override");

/* GET home page. */
const UserController = require("../controllers/users.controller");
const fileUpload = require("../config/fileUpload");
const ArticleController = require("../controllers/Article");
const NewsController = require("../controllers/News");
const WaterDataController = require("../controllers/WaterData");
const ContactController = require("../controllers/ContactUs");
const KnowlegdeController = require("../controllers/Knowledge");
const UpComingEventController = require("../controllers/UpComingEvent");
const HighlightController = require("../controllers/Highlights");
const GalleryController = require("../controllers/Gallery");
router.use(methodOverride("_method"));
router.get("/ExpertArticles", ArticleController.expertArticles);
router.get("/BloggerArticles", ArticleController.bloggerArticles);
router.get("/Article/:id", ArticleController.byId);
router.post("/Article", fileUpload.array("image",3), ArticleController.create);
router.put(
  "/Article/:id",
  fileUpload.array("image",3),
  ArticleController.updateById
);
router.delete("/Article/:id", ArticleController.deleteById);
router.get("/News", NewsController.index);
router.get("/News/:id", NewsController.byId);
router.post("/News", fileUpload.single("image"), NewsController.create);
router.put("/News/:id", fileUpload.single("image"), NewsController.updateById);
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

//adminpanel
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/home", function(req, res, next) {
  res.render("pages/home");
});

router.get("/profile", function(req, res, next) {
  res.render("pages/profile");
});
router.get("/users", UserController.getAll);
router.get("/adduser", function(req, res, next) {
  res.render("pages/adduser", { url: "/register", dat: "" });
});
router.get("/adminpanel", function(req, res, next) {
  res.render("pages/login", { title: "Clean Water together Admin panel" });
});

router.get("/addarticle", function(req, res, next) {
  res.render("pages/addarticle", { dat: "", url: "/adminArticle/1" });
});
router.get("/addgallery", function(req, res, next) {
  res.render("pages/addgallery", { dat: "", url: "/Gallery/1" });
});

router.get("/addquestion", function(req, res, next) {
  res.render("pages/addquestion", { dat: "", url: "/Knowledge/1" });
});

router.get("/addnews", function(req, res, next) {
  res.render("pages/addnews", { dat: "", url: "/adminArticle/1" });
});
router.get("/addevent", function(req, res, next) {
  res.render("pages/addevent", { dat: "", url: "/adminUpComingEvent/1" });
});
router.get("/addhighlights", HighlightController.selectdata);

router.get("/know", function(req, res, next) {
  res.render("pages/know");
});
router.get("/events/:id", UpComingEventController.index);

router.get("/about", function(req, res, next) {
  res.render("pages/404");
});
router.put(
  "/editArticle/:id",
  fileUpload.single("image"),
  ArticleController.updateById
);
router.put(
  "/editHighlight/:id",
  fileUpload.single("image"),
  HighlightController.updateById
);
router.put(
  "/editNews/:id",
  fileUpload.single("image"),
  NewsController.updateById
);
router.put(
  "/editEvent/:id",
  fileUpload.single("image"),
  UpComingEventController.updateById
);
router.put(
  "/editquestion/:id",
  fileUpload.single("image"),
  KnowlegdeController.updateById
);
router.put("/edituser/:id", UserController.update);
router.post(
  "/Gallery/:id",
  fileUpload.single("image"),
  GalleryController.create
);
router.post("/authenticate", UserController.authenticate);
router.post("/register", UserController.register);
router.delete("/userdelete/:id", UserController.delete);

router.get("/adminarticle/:id", ArticleController.expertArticles);
router.post(
  "/adminArticle/:id",
  fileUpload.single("image"),
  ArticleController.create
);
router.get(
  "/contactus/:id",
  fileUpload.single("image"),
  ContactController.index
);
router.get(
  "/admineditgallery/:id",
  fileUpload.single("image"),
  GalleryController.byId
);
router.get(
  "/admineditArticle/:id/:fid",
  fileUpload.single("image"),
  ArticleController.byId
);
router.get("/gallery/:id", fileUpload.single("image"), GalleryController.index);
router.get(
  "/admineditQuestion/:id",
  fileUpload.single("image"),
  KnowlegdeController.byId
);
router.delete("/gallerydelete/:id", GalleryController.deleteById);
router.get(
  "/admineditEvent/:id",
  fileUpload.single("image"),
  UpComingEventController.byId
);
router.get("/adminedituser/:id", UserController.getById);
router.get(
  "/admineditNews/:id",
  fileUpload.single("image"),
  NewsController.byId
);
router.get(
  "/adminedithighlight/:id",
  fileUpload.single("image"),
  HighlightController.byId
);
router.post(
  "/adminNews/:id",
  fileUpload.single("image"),
  NewsController.create
);
router.get("/adminnews/:id", NewsController.index);
router.get("/adminKnowledge/:id", KnowlegdeController.index);
router.post(
  "/Knowledge/:id",
  fileUpload.array("image", 3),
  KnowlegdeController.create
);
router.get("/adminhighlights/:id", HighlightController.index);
router.post(
  "/adminHighlights/:id",
  fileUpload.single("image"),
  HighlightController.create
);
router.delete("/deletequestion/:id", KnowlegdeController.deleteById);
router.delete("/contact/:id", ContactController.deleteById);
router.post(
  "/adminUpComingEvent/:id",
  fileUpload.single("image"),
  UpComingEventController.create
);

//till here
//tilll here
//till here
//till here

module.exports = router;
