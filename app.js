//require("rootpath")();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const indexRouter = require("./routes/index");
var session = require('express-session');


const app = express();
app.use(session({secret: "Shh, its a secret!"}));
app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// app.use(jwt());

//app.use("/public", express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", parameterLimit: 50000, extended: true })
);

// app.use(errorHandler);
app.use(cookieParser());
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use("/public", express.static(path.join(__dirname, "public"),{
  etag: true, // Just being explicit about the default.
  lastModified: true,  // Just being explicit about the default.
  setHeaders: (res, path) => {
    const hashRegExp = new RegExp('\\.[0-9a-f]{8}\\.');

    if (path.endsWith('.html')) {
      // All of the project's HTML files end in .html
      res.setHeader('Cache-Control', 'no-cache');
    } else if (hashRegExp.test(path)) {
      // If the RegExp matched, then we have a versioned URL.
      res.setHeader('Cache-Control', 'max-age=31536000');
    }
  },
}));



app.set("views", path.join(__dirname, "views/admin"));
// app.set("view engine", "jade");
app.use("/", indexRouter);
//app.use("/users", usersRouter);

module.exports = app;
