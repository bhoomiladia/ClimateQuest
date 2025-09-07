import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IAchievement extends Document {
  user: mongoose.Types.ObjectId; // reference to User
  title: string;
  description?: string;
  earnedAt: Date;
}

const AchievementSchema: Schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  earnedAt: {
    type: Date,
    default: Date.now,
  },
});

const Achievement = (mongoose.models.Achievement as Model<IAchievement>) 
  || mongoose.model<IAchievement>('Achievement', AchievementSchema);

export default Achievement;
