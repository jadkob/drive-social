import mongoose from "mongoose";
import { bacgram } from "../setup";

export interface Comment {
  id: String;
  username: String;
  title: String;
  text: String;
  createdAt: Date;
}
export const postSchema = new mongoose.Schema({
  author: String,
  name: String,
  country: String,
  rsvps: [String],
  date: String,
  location: String,
});

export const Post = bacgram.model("Post", postSchema);
