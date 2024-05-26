import * as jwt from "jsonwebtoken";
import { Post } from "../models/post";
import { isEmpty } from "../isEmpty";
import { User } from "../models/user";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token || !(await jwt.verify(token, "secret")))
      return new Response("Unauthorized", { status: 401 });

    const decoded: any = await jwt.decode(token);
    const posts = await Post.find({
      author: { $ne: decoded.username },
    });
    if (posts.length == 0)
      return new Response("No Events Yet", { status: 404 });

    return Response.json(posts);
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
export async function POST(req: Request) {
  try {
    const { name, country, location, date } = await req.json();
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    if (
      !name ||
      !location ||
      !country ||
      !date ||
      isEmpty([name, country, location, date])
    )
      return new Response("Bad request", { status: 400 });
    if (!token || !(await jwt.verify(token, "secret")))
      return new Response("Unauthorized", { status: 401 });
    const decoded: any = await jwt.decode(token);

    const post = await Post.create({
      author: decoded.username,
      name,
      country,
      location,
      date,
    });
    await User.findByIdAndUpdate(decoded.id, {
      $push: { posts: post._id },
    });
    return Response.json(post);
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
