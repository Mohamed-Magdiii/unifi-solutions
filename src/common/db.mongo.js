const config  = require("./keys")
const mongoose  = require('mongoose')

const connectDb = ()=> mongoose.connect(config.mongoUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    useFindAndModify:false,
    serverSelectionTimeoutMS: 5000,
    family: 4,
}).then((db) => {
    console.log('Connected to MongoDB...');
    // dbWatcher();
    return db;
  })
  .catch((err) => {
    console.log(err);
    console.error('Could not connect to MongoDB, existing the application');
    process.exit();
    return null;
  });
module.exports = connectDb;