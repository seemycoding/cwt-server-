var express = require("express");
var router = express.Router();
var multer = require("multer");
//retrieving data from database;

//import schema
const article = require("../model/article");
const news = require("../model/news");
const questions = require("../model/knowledge");
const highlights = require("../model/highlights");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  }
});

const filefilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  fileFilter: filefilter
});
//get articles
router.get("/articles", (req, res, next) => {
  article.find(function(err, articles) {
    if (err) {
      res.json(err);
    } else {
      res.json(articles);
    }
  });
});
//get news
router.get("/news", (req, res, next) => {
  news.find(function(err, news) {
    if (err) {
      res.json(err);
    } else {
      res.json(news);
    }
  });
});
//get knowldege
router.get("/knowledge/:id", (req, res, next) => {
  questions.find({ type: req.params.id }, (err, questions) => {
    if (err) {
      res.json(err);
    } else {
      res.json(questions);
    }
  });
});
//get highlights
router.get("/getHighlights", (req, res, next) => {
  highlights.find(function(err, highlights) {
    if (err) {
      res.json(err);
    } else {
      res.json(highlights);
    }
  });
});

//get image path

//insert new highlights
router.post("/highlights", upload.single("image"), (req, res, next) => {
  let story = new highlights({
    image: req.file.path.replace("\\", "/"),
    title: req.body.title
  });
  story.save((err, highlights) => {
    if (err) {
      res.json(err);
    } else {
      res.json({
        message: "File uploaded successfully",
        story
      });
    }
  });
});

//insert new article
router.post("/ArticlePost", (req, res, next) => {
  let newArticle = new article({
    name: req.body.name,
    profession: req.body.profession,
    title: req.body.title,
    detail: req.body.detail,
    expert: req.body.expert
  });

  newArticle.save((err, article) => {
    if (err) {
      res.json(err);
    } else {
      res.json({
        message: "Article has been added",
        newArticle
      });
    }
  });
});

//insert news
router.post("/NewsPost", (req, res, next) => {
  let newNews = new news({
    source: req.body.source,
    date: new Date(),
    title: req.body.title,
    detail: req.body.detail
  });

  newNews.save((err, newNews) => {
    if (err) {
      res.json(err);
    } else {
      res.json({
        message: "News has been added",
        newNews
      });
    }
  });
});

//insert knowledge question

router.post("/questionPost", upload.array("image", 3), (req, res, next) => {
  let imagePath = [];
  if (req.files != null) {
    for (let i = 0; i < req.files.length; i++) {
      imagePath.push(req.files[i].path.replace("\\", "/"));
    }
  }
  let newQuestion = new questions({
    question: req.body.question,
    responseType: req.body.responseType,
    type: req.body.type,
    count: req.body.count,
    image: imagePath,
    option: req.body.option
  });

  newQuestion.save((err, newQuestion) => {
    if (err) {
      res.json(err);
    } else {
      res.json({
        message: "Question has been added",
        newQuestion
      });
    }
  });
});

router.post("/response", (req, res, next) => {
  res.json({
    message: "Response recieved",
    response: req.body.response
  });
});

//updating data
router.put("/put_route", (req, res, next) => {
  //to do later
});

//deleting data
router.delete("/delete_route", (req, res, next) => {
  //to do later
});
module.exports = router;
