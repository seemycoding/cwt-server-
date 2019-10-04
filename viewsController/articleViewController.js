const express = require("express");
const router = express.Router();
const ArticleController = require("../controllers/Article");

const getArticles = {
  getarticles: (req, res, next) => {
    //router.get("/ExpertArticles", ArticleController.expertArticles);
    ArticleController.expertArticles()

      .then(data => {
        data.forEach(element => {
          console.log("sad" + element._id);
        });
      })
      .catch(err => {
        console.log(err);
      });

    res.render("pages/Article");
  }
};
module.exports = getArticles;
