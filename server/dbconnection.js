const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

module.exports = mongoose.connect(
  process.env.CHATTYY_DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
