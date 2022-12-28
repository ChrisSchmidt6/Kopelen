import mongoose from "mongoose";

let AccessKeySchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  expiration: {
    type: Date,
    required: true,
    default: new Date(
      Date.now() + 1000 * 60 * 24 * 14 /* 14 day expiration from creation */
    ),
  },
});

export default mongoose.models.AccessKey ||
  mongoose.model("AccessKey", AccessKeySchema);
