import * as jwt from "jsonwebtoken";
import { User } from "../../models/user";
import mongoose from "mongoose";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    const decoded: any = await jwt.decode(token as string);
    const id = decoded.id;
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return new Response("Invalid user ID", { status: 400 });
    }
    if (!token || !(await jwt.verify(token, "secret")))
      return new Response("Unauthorized", { status: 401 });

    const user = await User.findById(userId);
    if (!user) return new Response("User not found", { status: 404 });

    const user2 = await User.findById(id);
    if (!user?.followers.includes(user2?.username as string))
      return new Response("Not following", { status: 400 });
    await User.findByIdAndUpdate(userId, {
      $pull: { followers: decoded.username },
    });
    await User.findByIdAndUpdate(id, {
      $pull: { following: user.username },
    });
    return Response.json({ message: "Unfollowed" }, { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
