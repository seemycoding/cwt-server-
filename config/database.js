const mongoose = require('mongoose')
//const dbUrl = process.env.DB_URL || 'mongodb://cwtUser:cleanwatertogether@localhost:27017/cwt?authSource=cwt'
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/cwt';
const client = mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//db connected
client.then((res) => {
  console.log(res);
  console.log("Connected to mongodb");
});
