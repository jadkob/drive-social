import { Post } from "../models/post";
import { User } from "../models/user";

export async function POST() {
  await User.deleteMany({});
  await Post.deleteMany({});
  return new Response("hi");
}
