import mongoose from "mongoose";

let UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  authenticated: {
    type: Boolean,
    required: true,
    default: true,
  },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  authorization: {
    type: Number,
    required: true,
    default: 1,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
