import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  dateCreated: { type: Date, default: new Date() },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  photo: { type: String, default: null },
  userName: { type: String, required: true },
});

export default mongoose.model('User', userSchema);
