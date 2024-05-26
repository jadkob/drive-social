import * as jwt from "jsonwebtoken";
import { Post } from "../../models/post";

export async function POST(req: Request) {
  try {
    const { postId } = await req.json();
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token || !(await jwt.verify(token, "secret")))
      return new Response("Unauthorized", { status: 401 });

    const decoded: any = await jwt.decode(token);
    const post = await Post.findById(postId);

    if (post?.rsvps.includes(decoded.username))
      return new Response("Already RSVPed", { status: 400 });
    await Post.findByIdAndUpdate(postId, {
      $push: { rsvps: decoded.username },
    });
    const updatedPost = await Post.findById(postId);
    return Response.json(updatedPost);
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
