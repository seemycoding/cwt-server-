const express = require("express");
const router = express.Router();
const methodOverride = require("method-override");

var session = require("express-session");

var app = express();

app.use(session({ secret: "Shh, its a secret!" }));

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
router.post(
  "/Article",
  fileUpload.fields([
    { name: "image", maxCount: 1 },
    { name: "dimage", maxCount: 1 }
  ]),
  ArticleController.create
);
router.put(
  "/Article/:id",
  fileUpload.fields([
    { name: "image", maxCount: 1 },
    { name: "dimage", maxCount: 1 }
  ]),
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
router.post(
  "/Gallery",
  fileUpload.fields([
    { name: "image", maxCount: 1 },
    { name: "thumbimage", maxCount: 1 }
  ]),
  GalleryController.create
);
router.put(
  "/Gallery/:id",
  fileUpload.fields([
    { name: "image", maxCount: 1 },
    { name: "thumbimage", maxCount: 1 }
  ]),
  GalleryController.updateById
);
router.delete("/Gallery/:id", GalleryController.deleteById);

//adminpanel

router.post("/authenticate", UserController.authenticate);
router.post("/register", UserController.checksignin, UserController.register);

router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/home", UserController.checksignin, function(req, res, next) {
  res.render("pages/home");
});

router.get(
  "/profile/:id",
  UserController.checksignin,
  UserController.getCurrent
);
router.get("/logout", UserController.logout);
router.get("/users", UserController.checksignin, UserController.getAll);
router.get("/adduser", UserController.checksignin, function(req, res, next) {
  res.render("pages/adduser", { url: "/register", dat: "" });
});
router.get("/adminpanel", function(req, res, next) {
  res.render("pages/login", {
    title: "Clean Water together Admin panel",
    message: ""
  });
  //   if (req.session) {
  //     if (req.session.user!=null) {
  //       res.render("pages/home",{user:req.session.user});
  //      }
  //   }
  //  else{
  //   res.render("pages/login", {
  //     title: "Clean Water together Admin panel",
  //     message: ""
  //   });
  // }
});

router.get("/addarticle", UserController.checksignin, function(req, res, next) {
  res.render("pages/addarticle", { dat: "", url: "/adminArticle/1" });
});
router.get("/addgallery", UserController.checksignin, function(req, res, next) {
  res.render("pages/addgallery", { dat: "", url: "/Gallery/1" });
});

router.get("/addquestion", UserController.checksignin, function(
  req,
  res,
  next
) {
  res.render("pages/addquestion", { dat: "", url: "/Knowledge/1" });
});

router.get("/addnews", UserController.checksignin, function(req, res, next) {
  res.render("pages/addnews", { dat: "", url: "/adminNews/1" });
});
router.get("/addevent", UserController.checksignin, function(req, res, next) {
  res.render("pages/addevent", { dat: "", url: "/adminUpComingEvent/1" });
});
router.get(
  "/addhighlights",
  UserController.checksignin,
  HighlightController.selectdata
);

router.get("/know", UserController.checksignin, function(req, res, next) {
  res.render("pages/know");
});
router.get(
  "/events/:id",
  UserController.checksignin,
  UpComingEventController.index
);

router.get("/about", UserController.checksignin, function(req, res, next) {
  res.render("pages/404");
});
router.put(
  "/editArticle/:id/:val",
  UserController.checksignin,
  fileUpload.fields([
    { name: "image", maxCount: 1 },
    { name: "dimage", maxCount: 1 }
  ]),
  ArticleController.updateById
);
router.put(
  "/editHighlight/:id/:val",
  UserController.checksignin,
  fileUpload.single("image"),
  HighlightController.updateById
);
router.put(
  "/editNews/:id/:val",
  UserController.checksignin,
  fileUpload.single("image"),
  NewsController.updateById
);
router.put(
  "/editEvent/:id/:val",
  UserController.checksignin,
  fileUpload.single("image"),
  UpComingEventController.updateById
);
router.put(
  "/editquestion/:id/:val",
  UserController.checksignin,
  fileUpload.array("image",3),
  KnowlegdeController.updateById
);
router.put("/edituser/:id", UserController.checksignin, UserController.update);
router.post(
  "/Gallery/:id",
  UserController.checksignin,
  fileUpload.fields([
    { name: "image", maxCount: 1 },
    { name: "thumbimage", maxCount: 1 }
  ]),
  GalleryController.create
);
router.put(
  "/editGallery/:id/:val",
  UserController.checksignin,
  fileUpload.fields([
    { name: "image", maxCount: 1 },
    { name: "thumbimage", maxCount: 1 }
  ]),
  GalleryController.updateById
);
router.delete(
  "/userdelete/:id",
  UserController.checksignin,
  UserController.delete
);
router.delete(
  "/Articledelete/:id/:val",
  UserController.checksignin,
  ArticleController.deleteById
);
router.delete(
  "/deleteHighlight/:id/:val",
  UserController.checksignin,
  HighlightController.deleteById
);
router.delete(
  "/deleteNews/:id/:val",
  UserController.checksignin,
  NewsController.deleteById
);
router.delete(
  "/deleteUpcomingEvent/:id/:val",
  UserController.checksignin,
  UpComingEventController.deleteById
);

router.get(
  "/adminarticle/:id",
  UserController.checksignin,
  ArticleController.index
);
router.post(
  "/adminArticle/:id",
  UserController.checksignin,
  fileUpload.fields([
    { name: "image", maxCount: 1 },
    { name: "dimage", maxCount: 1 }
  ]),
  ArticleController.create
);
router.get(
  "/contactus/:id",
  UserController.checksignin,
  fileUpload.single("image"),
  ContactController.index
);
router.get(
  "/admineditgallery/:id/:val",
  UserController.checksignin,
  fileUpload.fields([
    { name: "image", maxCount: 1 },
    { name: "thumbimage", maxCount: 1 }
  ]),
  GalleryController.byId
);
router.get(
  "/admineditArticle/:id/:val",
  UserController.checksignin,
  fileUpload.fields([
    { name: "image", maxCount: 1 },
    { name: "dimage", maxCount: 1 }
  ]),
  ArticleController.byId
);
router.get(
  "/gallery/:id",
  UserController.checksignin,
  fileUpload.single("image"),
  GalleryController.index
);
router.get(
  "/admineditQuestion/:id/:val",
  UserController.checksignin,
  fileUpload.single("image"),
  KnowlegdeController.byId
);
router.delete(
  "/gallerydelete/:id/:val",
  UserController.checksignin,
  GalleryController.deleteById
);
router.get(
  "/admineditEvent/:id/:val",
  UserController.checksignin,
  fileUpload.single("image"),
  UpComingEventController.byId
);
router.get(
  "/adminedituser/:id",
  UserController.checksignin,
  UserController.getById
);
router.get(
  "/admineditNews/:id/:val",
  UserController.checksignin,
  fileUpload.single("image"),
  NewsController.byId
);
router.get(
  "/adminedithighlight/:id/:val",
  UserController.checksignin,
  fileUpload.single("image"),
  HighlightController.byId
);
router.post(
  "/adminNews/:id",
  UserController.checksignin,
  fileUpload.single("image"),
  NewsController.create
);
router.get("/adminnews/:id", UserController.checksignin, NewsController.index);
router.get(
  "/adminKnowledge/:id",
  UserController.checksignin,
  KnowlegdeController.index
);
router.post(
  "/Knowledge/:id",
  UserController.checksignin,
  fileUpload.array("image", 3),
  KnowlegdeController.create
);
router.get(
  "/adminhighlights/:id",
  UserController.checksignin,
  HighlightController.index
);
router.post(
  "/adminHighlights/:id",
  UserController.checksignin,
  fileUpload.single("image"),
  HighlightController.create
);
router.delete(
  "/deletequestion/:id/:val",
  UserController.checksignin,
  KnowlegdeController.deleteById
);
router.delete(
  "/contact/:id",
  UserController.checksignin,
  ContactController.deleteById
);
router.post(
  "/adminUpComingEvent/:id",
  UserController.checksignin,
  fileUpload.single("image"),
  UpComingEventController.create
);

//till here
//tilll here
//till here
//till here

module.exports = router;
