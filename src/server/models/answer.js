import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: { type: Number, unique: true, index: true },
  userId: { type: Number, required: true },
  answers: { type: [String] }
})

export default mongoose.model('User', userSchema);
