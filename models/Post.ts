import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IPost extends Document {
  user: mongoose.Types.ObjectId; // reference to User
  content: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema: Schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

const Post = (mongoose.models.Post as Model<IPost>) || mongoose.model<IPost>('Post', PostSchema);

export default Post;
