import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex gap-[5vw] w-full h-screen items-center justify-center">
      <Button asChild className="text-[1.5rem]">
        <Link href={"/login"}>LogIn</Link>
      </Button>
      <Button asChild className="text-[1.5rem]">
        <Link href={"/signup"}>SignUp</Link>
      </Button>
    </div>
  );
}
