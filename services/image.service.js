var webp = require("webp-converter");
var fs = require("fs");
module.exports = {
    convertAllImage
  };

  async function convertAllImage(path){
    webp.cwebp(path,`${path}.webp`,"-q 80", function (status,error) {
        fs.unlinkSync(path);
        //if conversion successful status will be '100'
        //if conversion fails status will be '101'
        console.log(status, error);
        if (status == 100) {
            return true;
        }
      });
      
  }