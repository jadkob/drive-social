import Link from "next/link";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
export default function Nav() {
  const router = useRouter();
  return (
    <nav className="flex items-center gap-[5vw] justify-center">
      <Link href={"/home"}>Home</Link>
      <Link href="/add">Add</Link>
      <Link href={"/profile"}>Profile</Link>
      <button
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
