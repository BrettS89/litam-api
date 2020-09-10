const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  dateCreated: { type: Date, default: new Date() },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  photo: { type: String, default: null },
  userName: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
