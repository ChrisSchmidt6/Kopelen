import mongoose from "mongoose";

let AccessKeySchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  valid: {
    type: Boolean,
    default: true,
    required: true,
  },
  usedBy: {
    type: String,
    default: "",
    required: true,
    unique: true,
  },
});

export default mongoose.models.AccessKey ||
  mongoose.model("AccessKey", AccessKeySchema);
