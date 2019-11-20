const Article = require("../models/Article");
const News = require("../models/News");
const Highlight = require("../models/Highlight");
const Gallery = require("../models/Gallery");
const question=require("../models/Knowledge");
const event=require("../models/UpComingEvent");
const user=require("../models/user.model");
const contact=require("../models/Contact");

const HomeController = {
  getCount: async (req, res, next) => {
    const articleCount = await Article.find().count();
    const newsCount = await News.find().count();
    const highCount = await Highlight.find().count();
    const galleryCount = await Gallery.find().count();
    const questionCount = await question.find().count();
    const eventCount = await event.find().count();
    const userCount=await user.find().count();
    const contactCount=await contact.find().count();


    console.log(articleCount, newsCount, highCount, galleryCount);
    const data=[
        {
            articleCount,
            newsCount,
            highCount,
            galleryCount,
            questionCount,
            eventCount,
            userCount,
            contactCount
        }
    ]

    res.render("pages/home", { data: data, message: "Welcome To CWT Admin Dashboard" });
  }
};
module.exports = HomeController;
