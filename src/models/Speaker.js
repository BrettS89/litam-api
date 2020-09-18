const mongoose = require('mongoose');

const speakerSchema = new mongoose.Schema({
  dateAdded: { type: Date, default: new Date() },
  givenId: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  socketId: { type: String, default: null },
});

module.exports = mongoose.model('Speaker', speakerSchema);
