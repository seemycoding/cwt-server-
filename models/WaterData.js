const Schema = require("mongoose").Schema;
const dbConnection = require("../config/database");
const waterDataSchema = new Schema({
  state: { type: String },
  district: { type: String },
  parameter: {
    ph: { type: String },
    tds: { type: String },
    no3: { type: String },
    flouride: { type: String }
  },
  cordinates: {
    longitude: { type: String },
    latitude: { type: String }
  }
});
module.exports = dbConnection.model("waterData", waterDataSchema);
