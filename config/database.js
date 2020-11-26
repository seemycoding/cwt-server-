const mongoose = require('mongoose')
const dbUrl = process.env.DB_URL || 'mongodb://cwtUser:4SCUzryXPu2VDD@localhost:27017/cwt?authSource=cwt'
// const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/cwt';
var options =  {
    useMongoClient: true,
    keepAlive: 1,
    connectTimeoutMS: 30000,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 5000,
    useNewUrlParser: true
 }
const dbConnetion = mongoose.createConnection(dbUrl,options );
module.exports = dbConnetion;
