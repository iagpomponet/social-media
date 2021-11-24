import mongoose from 'mongoose';

const Post = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true },
  owner: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
  content: { type: String, required: true },
  likes: { type: [mongoose.Types.ObjectId], default: [] },
  comments: { type: Array, default: [] },
});

export default mongoose.model('post', Post);
