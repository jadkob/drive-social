import mongoose from "mongoose";
import { bacgram } from "../setup";

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  followers: [String],
  following: [String],
  posts: [String],
  country: String,
  location: String,
  createdAt: { type: Date, default: Date.now },
});

export const User = bacgram.model("User", userSchema);
