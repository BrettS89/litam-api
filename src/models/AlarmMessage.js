const mongoose = require('mongoose');

const alarmMessageSchema = new mongoose.Schema({
  dateCreated: { type: Date, default: new Date() },
  alarm: { type: mongoose.Schema.Types.ObjectId, ref: 'Alarm' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  song: { type: String, required: true },
  message: { type: String, default: null },
  forUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  wasReceived: { type: Boolean, default: false }, 
});

module.exports = mongoose.model('AlarmMessage', alarmMessageSchema);
