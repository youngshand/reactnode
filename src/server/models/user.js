// @flow
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: { type: Number, unique: true, index: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  ip: String,
  userAgent: String,
  ageRange: String,
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
})

export default mongoose.model('User', userSchema);
