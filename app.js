const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
//app.use("/public", express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", parameterLimit: 50000, extended: true })
);
app.use(cookieParser());
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use("/public", express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views/admin"));
// app.set("view engine", "jade");
app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
