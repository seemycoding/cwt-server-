const userService = require("../services/user.service");
const user = require("../models/user.model");
var express = require("express");
var cookieParser = require("cookie-parser");
var session = require("express-session");

var app = express();

app.use(cookieParser());
app.use(session({ secret: "Shh, its a secret!" }));

// routes
// router.post("/authenticate", authenticate);
// router.post("/register", register);
// router.get("/", getAll);
// router.get("/current", getCurrent);
// router.get("/:id", getById);
// router.put("/:id", update);
// router.delete("/:id", _delete);
let userd;
const UserController = {
  authenticate: (req, res, next) => {
    userService
      .authenticate(req.body)
      .then(user => {
        if (user) {
          //res.status(200).json({user})
          req.session.user = user.username;
          req.session.idd = user._id;
          req.session.cookie.expires = new Date(Date.now() + 6000000);
          res.locals.user = req.session.user;
          res.locals.id = req.session.idd;
            res.redirect("/home");
          // res.render("pages/home", {data:"", id: user._id });
        } else {
          res.render("pages/login", {
            message: "Username and password do not match !!"
          });
        }
      })
      .catch(err => next(err));
  },

  checksignin: (req, res, next) => {
    if (req.session.user) {
      res.locals.user = req.session.user;
      res.locals.id = req.session.idd;
      next(); //If session exists, proceed to page
    } else {
      var err = new Error("Not logged in!");
      console.log(req.session.user);
      next(err); //Error, trying to access unauthorized page!
    }
  },

  register: (req, res, next) => {
    userService
      .create(req.body)
      .then(() =>
        userService.getAll().then(users => {
          res.render("pages/users", {
            message: "User added successfully",
            data: users
          });
        })
      )
      .catch(err => next(err));
  },

  getAll: (req, res, next) => {
    userService
      .getAll()
      .then(users => {
        userd = users;
        res.render("pages/users", { data: users, message: "" });
      })
      .catch(err => next(err));
  },

  delete: (req, res, next) => {
    userService
      .delete(req.params.id)
      .then(() =>
      userService.getAll().then((user)=>{
        res.render("pages/users", {
          message: "User deleted successfully",
          data: user
        })
      })
       
      )
      .catch(err => next(err));
  },

  getCurrent: (req, res, next) => {
    userService
      .getById(req.params.id)
      .then(user =>
        user
          ? res.render("pages/profile", {
              dat: user,
              url: "/edituser/" + req.params.id + "?_method=PUT"
            })
          : res.sendStatus(404)
      )
      .catch(err => next(err));
  },

  getById: (req, res, next) => {
    userService
      .getById(req.params.id)
      .then(user =>
        user
          ? res.render("pages/adduser", {
              dat: user,
              url: "/edituser/" + req.params.id + "?_method=PUT"
            })
          : res.sendStatus(404)
      )
      .catch(err => next(err));
  },
  update: (req, res, next) => {
    userService
      .update(req.params.id, req.body)
      .then(() =>
      userService.getAll().then((user)=>
      {
        res.render("pages/users", {
          message: "User Details Updated Successfully",
          data: user
        }) 
      })
      )
      
      .catch(err => next(err));
  },
logout:(req,res,next)=>{
  req.session.destroy(function(err) {
   res.redirect('/adminpanel');
   
  })

}
}

module.exports = UserController;
