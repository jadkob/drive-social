import Link from "next/link";

export default function Home() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md flex flex-col gap-[3vh]">
          <h1 className="text-5xl font-bold">Welcome to Drive Social!</h1>
          <p className="py-6 text-[1.3rem]">
            The best platform to host and find car meets
          </p>
          <div className="flex gap-[4vw] justify-center">
            <Link href="/login">
              <button className="btn btn-neutral px-[5vw] text-white text-[1.7rem]">
                LogIn
              </button>
            </Link>
            <Link href="/signup">
              <button className="btn btn-neutral px-[5vw] text-white text-[1.7rem]">
                SignUp
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
