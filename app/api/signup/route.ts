import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { isEmpty } from "../isEmpty";
import { User } from "../models/user";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password || isEmpty([username, password]))
      return new Response("Invalid credentials", { status: 400 });

    const userCheck = await User.findOne({ username });
    if (userCheck) return new Response("User already exists", { status: 400 });

    const user = await User.create({
      username,
      password: await bcrypt.hash(password, 10),
    });

    const token = await jwt.sign({ id: user.id, username }, "secret");
    return Response.json(token);
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
