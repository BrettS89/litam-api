const mongoose = require('mongoose');

const alarmSchema = new mongoose.Schema({
  dateCreated: { type: Date, default: new Date() },
  updatedDate: { type: Date, default: new Date() },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  time: { type: String, required: true },
  displayTime: { type: String, required: true },
  amPm: { type: String, required: true },
  day: { type: String, required: true },
  days: [{ type: String }],
  active: { type: Boolean, default: true },
  alarmMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'AlarmMessage', default: null },
  userWhoSetMessage: { type: String, default: null },
  isPublic: { type: Boolean, default: true },
  defaultSong: { type: String, required: true },
});

module.exports = mongoose.model('Alarm', alarmSchema);
