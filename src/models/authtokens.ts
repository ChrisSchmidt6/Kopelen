import mongoose from "mongoose";

let AuthTokenSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  expiration: {
    type: Date,
    default: new Date(
      Date.now() + 1000 * 60 * 24 * 14 /* 14 day expiration from creation */
    ),
    required: true,
  },
});

export default mongoose.models.AuthToken ||
  mongoose.model("AuthToken", AuthTokenSchema);