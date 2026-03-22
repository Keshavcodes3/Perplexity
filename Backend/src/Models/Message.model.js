import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
      required: [true, 'Chat is required'],
    },
    content: {
      type: String,
      required: [true, 'Message content is required'],
    },
    role: {
      type: String,
      enum: ['user', 'AI'],
      required: [true, 'Role is required'],
    },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model('Message', messageSchema);

export default MessageModel;
