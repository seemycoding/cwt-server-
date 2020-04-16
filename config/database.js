const mongoose = require('mongoose')
const dbUrl = process.env.DB_URL || 'mongodb://cwtUser:cleanwatertogether@localhost:27017/cwt?authSource=cwt'
const dbConnetion = mongoose.createConnection(dbUrl);
module.exports = dbConnetion;
