import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  authId: String,
  firstName: String,
  lastName: String,
  phone: String,
  city: String,
  pincode: String,
});

export default mongoose.model('User', userSchema);