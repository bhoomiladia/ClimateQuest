import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  points: number;
  badge?: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null;
}

const UserSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: '', // optional profile pic
  },
  points: {
    type: Number,
    default: 0, // needed for leaderboard
  },
  image: {
    type: String,
    default: null,
  },
  
  badge: {
    type: String,
    default: '', // e.g. "Gold", "Silver", "Champion"
  },
}, {
  timestamps: true,
});

// Reuse model if already defined (prevents hot-reload errors in Next.js)
const User = (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>('User', UserSchema);

export default User;
