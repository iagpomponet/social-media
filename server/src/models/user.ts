import mongoose from 'mongoose';

interface UserI {
  _id: mongoose.Types.ObjectId,
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePic: string;
}

const User = new mongoose.Schema<UserI>({
  _id: mongoose.Types.ObjectId,
  profilePic: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/ },
  password: { type: String, required: true },
}, { strict: true });

export default mongoose.model('user', User);
