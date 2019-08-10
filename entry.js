//import modules
var express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var path = require("path");
const cors = require("cors");

var app = express();

const route = require("./route/routes");
//connect to mongo
mongoose.connect("mongodb://localhost:27017/cwt");
//on connection
mongoose.connection.on("connected", () => {
  console.log("mongodb connected at port 27017");
});
//on connection error
mongoose.connection.on("error", err => {
  console.log(err);
});

const PORT = 3000;

//middleware
const directory = path.join(__dirname, "/uploads");
app.use("/uploads", express.static(directory));
//app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(bodyparser.json());

app.use("/api", route);
app.get("/", (req, res) => {
  res.send("foobar");
});

app.listen(PORT, () => {
  console.log("server has been started on port: " + PORT);
});
