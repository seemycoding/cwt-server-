const mongoose = require('mongoose')
const dbConnetion = mongoose.createConnection('mongodb://localhost/new_cwt')
module.exports = dbConnetion;