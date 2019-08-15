const mongoose = require('mongoose')
const dbConnetion = mongoose.createConnection('mongodb://localhost/cwt')
module.exports = dbConnetion;