import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  question: String,
  answer: String,
  references: [
    {
      documentName: String,
      excerpt: String
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Chat", chatSchema);
