"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Error from "../customComponents/Error";
import Loading from "../customComponents/Loading";
import Back from "../customComponents/backButton";

export default function LogIn() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const name = useRef<HTMLInputElement>(null);
  const country = useRef<HTMLInputElement>(null);
  const location = useRef<HTMLInputElement>(null);
  const date = useRef<HTMLInputElement>(null);
  const router = useRouter();
  return loading ? (
    <Loading />
  ) : (
    <>
      <form
        className="flex flex-col gap-[3vh] items-center justify-center h-screen"
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          setError("");
          axios
            .post("/api/posts", {
              name: name.current?.value,
              country: country.current?.value,
              location: location.current?.value,
              date: date.current?.value,
            })
            .then((res) => {
              alert("Post created successfully");
              router.push("/home");
            })
            .catch((err) => {
              setError(err.response.data);
            })
            .finally(() => setLoading(false));
        }}
      >
        {error && <Error error={error} />}
        <Input
          type="text"
          placeholder="Event Name"
          ref={name}
          className="w-fit px-[4vw]"
        />
        <Input ref={country} placeholder="Country" className="w-fit px-[4vw]" />
        <Input
          ref={location}
          placeholder="Location"
          className="w-fit px-[4vw]"
        />
        <Input
          ref={date}
          placeholder="Date"
          className="w-fit px-[4vw]"
          type="date"
        />
        <Button>Add</Button>
      </form>
    </>
  );
}