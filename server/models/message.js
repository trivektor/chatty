const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model(
  'Message',
  new Schema(
    {
      message: String,
      name: String,
    },
    {
      timestamps: true,
    }
  )
);
