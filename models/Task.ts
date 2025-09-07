import mongoose, { Document, Model, Schema } from "mongoose";

export interface ITask extends Document {
  user: mongoose.Types.ObjectId;
  description: string;
  imageUrl: string;
  verification: {
    status: "Verified" | "Unclear" | "False";
    confidence: number;
  };
  feedback: string[];
  points: number;
  createdAt: Date;
}

const TaskSchema: Schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    verification: {
      status: { type: String, enum: ["Verified", "Unclear", "False"], required: true },
      confidence: { type: Number, required: true },
    },
    feedback: [{ type: String }],
    points: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Task =
  (mongoose.models.Task as Model<ITask>) ||
  mongoose.model<ITask>("Task", TaskSchema);

export default Task;
