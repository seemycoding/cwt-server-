const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: async (req, file, callback) => {
    callback(null, "/var/uploads/cwt");
  },
  //filename
  //filename
  filename: function (req, file, callback) {
    var filename=new Date().toISOString().replace(/:/g, "-") + file.originalname;
    callback(
      null,
      filename
    );
  },
  
});

const fileFilter = async (req, file, callback) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/svg+xml"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

module.exports = upload;
