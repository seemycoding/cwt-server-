const mongoose = require('mongoose')
//const dbUrl = process.env.DB_URL || 'mongodb://cwtUser:cleanwatertogether@localhost:27017/cwt?authSource=cwt'
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/cwt';
var options =  {useNewUrlParser: true, useMongoClient: true, keepAlive: 1, connectTimeoutMS: 30000, reconnectTries: 30, reconnectInterval: 5000 }
const dbConnetion = mongoose.createConnection(dbUrl,options );
module.exports = dbConnetion;
