const WaterData = require("../models/WaterData");
const WaterDataController = {
  byState: async (req, res, next) => {
    let waterData = await WaterData.find({ state: req.params.state });
    res.json(waterData);
  },

  create: async (req, res, next) => {
    let stateCode = req.body.state || "";
    let city = req.body.city || "";
    let TDS = req.body.TDS || "";
    let NO3 = req.body.NO3 || "";
    let Flouride = req.body.Flouride || "";
    let PHValue = req.body.PHValue || "";
    let latitute = req.body.latitute || "";
    let longitute = req.body.longitute || "";

    let waterData = await WaterData.create({
      state: stateCode,
      city: city,
      parameter: {
        TDS: TDS,
        NO3: NO3,
        PHValue: PHValue,
        Flouride: Flouride
      },
      latLng: [latitute, longitute]
    });
    res.json(waterData);
  }
};

module.exports = WaterDataController;
