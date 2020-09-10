import mongoose from 'mongoose';

const alarmMessageSchema = new mongoose.Schema({
  dateCreated: { type: Date, default: new Date() },
  alarm: { type: mongoose.Schema.Types.ObjectId, ref: 'Alarm' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  song: { type: String, required: true },
  message: { type: String, default: null },
});

export default mongoose.model('AlarmMessage', alarmMessageSchema);
