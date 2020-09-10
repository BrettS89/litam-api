const mongoose = require('mongoose');

const alarmSchema = new mongoose.Schema({
  dateCreated: { type: Date, default: new Date() },
  updatedDate: { type: Date, default: new Date() },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  time: { type: Date, required: true },
  repeats: { type: Boolean, required: true },
  day: { type: String },
  days: [{ type: String }],
  alarmMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'AlarmMessage', default: null },
});

module.exports = mongoose.model('Alarm', alarmSchema);
