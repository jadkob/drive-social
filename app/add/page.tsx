"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Error from "../customComponents/Error";
import Loading from "../customComponents/Loading";
import Back from "../customComponents/backButton";
import Nav from "../Nav";
import { getCookie } from "cookies-next";

export default function LogIn() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const name = useRef<HTMLInputElement>(null);
  const country = useRef<HTMLInputElement>(null);
  const location = useRef<HTMLInputElement>(null);
  const [date, setDate] = useState("");
  const router = useRouter();
  return loading ? (
    <Loading />
  ) : (
    <>
      <Nav />
      <h1 className="text-center text-[3rem] mt-[20vh] mb-[-10vh] font-bold">
        Add
      </h1>
      <form
        className="flex flex-col gap-[3vh] items-center justify-center h-screen"
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          setError("");
          axios
            .post(
              "/api/posts",
              {
                name: name.current?.value,
                country: country.current?.value,
                location: location.current?.value,
                date,
              },
              {
                headers: {
                  Authorization: `Bearer ${getCookie("token")}`,
                },
              }
            )
            .then((res) => {
              router.push("/home");
            })
            .catch((err) => {
              setError(err.response.data);
            })
            .finally(() => {
              setLoading(false);
            });
        }}
      >
        {error && <Error error={error} />}
        <input
          type="text"
          placeholder="Name"
          className="input input-bordered w-full max-w-xs"
          ref={name}
        />
        <input
          type="text"
          placeholder="Country"
          ref={country}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          ref={location}
        />
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setDate(e.target.value)}
        />
        <button className="btn btn-neutral btn-wide text-[1.5rem] text-white">
          Add
        </button>
      </form>
    </>
  );
}
