import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  id: { type: Number, unique: true, index: true },
  type: String,
  text: String,
  answers: Array
})

export default mongoose.model('Question', questionSchema);
