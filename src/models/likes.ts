import mongoose from "mongoose";

let LikeSchema = new mongoose.Schema({
  threadId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Like || mongoose.model("Like", LikeSchema);
