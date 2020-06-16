const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

module.exports = mongoose.connect(process.env.CHATTYY_MLAB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
