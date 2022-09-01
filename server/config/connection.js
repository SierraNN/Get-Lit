const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'get-lit-db'
  }
);

module.exports = mongoose.connection;
