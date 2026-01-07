import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  filename: String,
  content: String,
  embeddings: [Number],
  status: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Document", documentSchema);
