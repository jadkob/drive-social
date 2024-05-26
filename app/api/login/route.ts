import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { User } from "../models/user";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return new Response("Invalid credentials", { status: 400 });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return new Response("Invalid credentials", { status: 400 });
    }

    if (!(await bcrypt.compare(password, user.password as string))) {
      return new Response("Invalid credentials", { status: 400 });
    }
    const token = await jwt.sign({ id: user.id, username }, "secret");
    return Response.json(token);
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
