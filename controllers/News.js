const News = require("../models/News");
const imageService =require("../services/image.service");

let newsdata;
const NewsController = {
  index: async (req, res, next) => {
    let news = await News.find();
    if (req.params.id == 1) {
      newsdata = news
   
      var passedVariable = req.query.message;
      res.render("pages/News", { data: news,message: passedVariable });
    } else {
      res.json(news);
    }
  },

  byId: async (req, res, next) => {
    let news = await News.findById(req.params.id);
    let link=news.link;
    res.render("pages/addnews", {
      dat: news,
      newslink:link,
      url: "/editNews/" + req.params.id +"/"+req.params.val+"?_method=PUT"
    });
  },

  create: async (req, res, next) => {
    let imagepath="";
    if (req.file) {
     imagepath = "/public/uploads/"+req.file.filename;
     imageService.convertAllImage(req.file.path);
    // if (image) {
    //   image = image.replace("\\", "/");
    // }
    
      
    }
    let source = req.body.source || "";
    let date = req.body.date || "";
    let title = req.body.title || "";
    let detail = req.body.detail || "";
    let receivedLink = req.body.link || "";
    let image =imagepath;
    let link = req.body.link || "";
    let news = await News.create({
      source: source,
      date: date,
      title: title,
      detail: detail,
      link: receivedLink,
      image: image,
      sortOrder: req.body.sortOrder,
      dateAdded: Date.now(),
      dateModified: Date.now()
    });
    if (req.params.id == 1) {
      res.redirect('/adminnews/1/?message=News item added successfully');
     
    }
    res.json(news);
  },

  updateById: async (req, res, next) => {
    let imagepath="";
    if (req.file) {
     imagepath = "/public/uploads/"+req.file.filename;
     imageService.convertAllImage(req.file.path);
    // if (image) {
    //   image = image.replace("\\", "/");
    // }
    
      
    }
    var news = new News({
      _id: req.body.id,
      source: req.body.source,
      date: req.body.date,
      title: req.body.title,
      detail: req.body.detail,
      link: req.body.link,
      image: imagepath,
      sortOrder: req.body.sortOrder,
      dateModified: Date.now()
    });
    News.updateOne({ _id: req.params.id }, news)
      .then(async result => {
        console.log(result);
        if (result.n > 0) {
          if (req.params.val) {
            res.redirect('/adminnews/1/?message=News item updated successfully');
          }else{
            res.status(200).json({ message: "News updated Successfully!" });
          }
         
          //
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Could not update news",
          error: error
        });
      });
  },

  deleteById: async (req, res, next) => {
    News.deleteOne({
      _id: req.params.id
    })
      .then(async result => {
      

        console.log(result);

        if (result.n > 0) {
          if (req.params.val==1) {
            res.redirect('/adminnews/1/?message=News item deleted successfully');
          }else{
            res.status(200).json({ message: "News deleted Successfully!" });
          }
         
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Could not delete news"
        });
      });
  }
};
module.exports = NewsController;
