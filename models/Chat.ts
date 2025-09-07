import mongoose, { Document, Schema } from 'mongoose'

export interface IChatMessage {
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export interface IChat extends Document {
  userId: string
  messages: IChatMessage[]
  createdAt: Date
  updatedAt: Date
}

const ChatMessageSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    enum: ['user', 'bot'],
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
})

const ChatSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  messages: [ChatMessageSchema]
}, {
  timestamps: true
})

export default mongoose.models.Chat || mongoose.model<IChat>('Chat', ChatSchema)