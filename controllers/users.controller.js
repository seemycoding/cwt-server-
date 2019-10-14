const userService = require("../services/user.service");
const user = require("../models/user.model");

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
          res.render("pages/home");
        } else {
          res
            .status(400)
            .json({ message: "Username or password is incorrect" });
        }
      })
      .catch(err => next(err));
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
        res.render("pages/users", {
          message: "User deleted successfully",
          data: userd
        })
      )
      .catch(err => next(err));
  },

  getCurrent: (req, res, next) => {
    userService
      .getById(req.user.sub)
      .then(user => (user ? res.json(user) : res.sendStatus(404)))
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
        res.render("pages/users", {
          message: "User Details Updated Successfully",
          data: userd
        })
      )
      .catch(err => next(err));
  }
};
module.exports = UserController;
