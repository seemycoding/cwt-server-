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
      district: city,
      parameter: {
        ph: PHValue,
        tds: TDS,
        no3: NO3,
        flouride: Flouride
      },
      cordinates:{
        longitute:longitute,
        latitute:latitute
      }
     
    });
    res.json(waterData);
  },

  getAllWaterData:async(req,res,next)=>{
    let data=await WaterData.find();
    var passedVariable = req.query.message;
    // console.log(data);
    
    res.render("pages/WaterData", { data: data, message: passedVariable });
    
  },
  delete:async(req,res,next)=>{
    let id =req.params.id
    WaterData.deleteOne({
      _id: id
    })
      .then(async result => {
        console.log(result);
        if (result.n > 0) {
          if (req.params.val == 1) {
            res.redirect('/waterdata/?message=State deleted successfully');
          } else {
            res.status(200).json({ message: "State deleted Successfully!" });
          }
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Could not delete State"
        });
      });
  },
  updateById:async(req,res,next)=>{
    console.log(req.params.id);
    console.log(req);
    
    var waterData = new WaterData({
      _id:req.params.id,
      state: req.body.state,
      district: req.body.district,
      parameter: {
        ph: req.body.PHValue,
        tds: req.body.TDS,
        no3: req.body.NO3,
        flouride: req.body.Flouride
      },
      cordinates:{
        longitute:req.body.longitute,
        latitute:req.body.latitute
      }
     
    });
    WaterData.updateOne({_id: req.params.id }, waterData)
      .then(async result => {
        console.log(result);
        if (result.n > 0) {
         res.redirect('/waterdata/?message=Water Data updated successfully');
         

          //
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Could not update event",
          error: error
        });
      });

  },

  byStateAndDistrict:async(req,res,next)=>{
    let state=req.params.state;
    let district=req.params.district;

    let waterData = await WaterData.find({ state: state,district:district });
    console.log(waterData);
    
    res.render("pages/addwaterdata", { dat: waterData[0], message: "" ,url:"/editWaterData/"+waterData[0]._id+"?_method=PUT"});
    
  }

 
};

module.exports = WaterDataController;
