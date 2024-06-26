"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Error from "../customComponents/Error";
import Loading from "../customComponents/Loading";
import Back from "../customComponents/backButton";
import { UsernameInput } from "../UsernameInput";
import { PasswordInput } from "../PasswordInput";

export default function LogIn() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const router = useRouter();
  return loading ? (
    <Loading />
  ) : (
    <>
      <Back
        className="w-[10vw] absolute ml-[4vw]"
        onClick={() => router.push("/")}
      />
      <form
        className="flex flex-col gap-[3vh] items-center justify-center h-screen"
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          setError("");
          axios
            .post("/api/login", {
              username: username.current?.value,
              password: password.current?.value,
            })
            .then((res) => {
              setCookie("token", res.data);
              router.push("/home");
            })
            .catch((err) => {
              setError(err.response.data);
            })
            .finally(() => setLoading(false));
        }}
      >
        {error && <Error error={error} />}
        <UsernameInput ref={username} />
        <PasswordInput ref={password} />
        <button className="btn btn-neutral btn-wide text-[1.4rem]">
          LogIn
        </button>
      </form>
    </>
  );
}
