const Message = require('./message').schema;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model(
  'Room',
  new Schema(
    {
      name: String,
      messages: [Message],
    },
    {
      timestamps: true,
    }
  )
);
