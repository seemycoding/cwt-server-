//require("rootpath")();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const indexRouter = require("./routes/index");
var session = require('express-session');
var client=require("./config/database");


const app = express();
app.use(session({secret: "Shh, its a secret!"}));
app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// app.use(jwt());

console.log(process.env);

//app.use("/public", express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", parameterLimit: 50000, extended: true })
);

//db connected
client.then((res) => {
  console.log(res);
  console.log("Connected to mongodb");
});
// app.use(errorHandler);
app.use(cookieParser());
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use("/public", express.static(path.join(__dirname, "public")));



  // app.use("/public/uploads", express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views/admin"));
// app.set("view engine", "jade");
app.use("/", indexRouter);
//app.use("/users", usersRouter);

module.exports = app;
