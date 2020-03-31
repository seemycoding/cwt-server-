const mongoose = require('mongoose')
const dbConnetion = mongoose.createConnection('mongodb://cwtUser:cleanwatertogether@localhost:27017/cwt')
module.exports = dbConnetion;