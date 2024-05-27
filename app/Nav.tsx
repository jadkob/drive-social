import Link from "next/link";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
export default function Nav() {
  const router = useRouter();
  return (
    <nav className="navbar bg-base-100 fixed flex items-center justify-center w-full gap-[1vw] sm:gap-[5vw] top-0">
      <Link href={"/home"} className="btn btn-ghost text-xl">
        Home
      </Link>
      <Link href="/add" className="btn btn-ghost text-xl">
        Add
      </Link>
      <Link href={"/profile"} className="btn btn-ghost text-xl">
        Profile
      </Link>
      <button
        className="btn btn-ghost text-xl"
        onClick={() => {
          deleteCookie("token");
          router.push("/");
        }}
      >
        LogOut
      </button>
    </nav>
  );
}
