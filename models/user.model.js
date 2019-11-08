const Schema = require("mongoose").Schema;
const dbConnection = require("../config/database");

const schema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  createdDate: { type: Date, default: Date.now },
  role: { type: String }
});
//comment

module.exports = dbConnection.model("User", schema);
