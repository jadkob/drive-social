"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { Button } from "@/components/ui/button";
import * as jwt from "jsonwebtoken";
import { Post } from "../types";
import Loading from "../customComponents/Loading";
import Nav from "../Nav";
import Error from "../customComponents/Error";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = getCookie("token") as string;
    const decoded: any = jwt.decode(token);
    setUsername(decoded?.username);

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/posts/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(res.data);
      } catch (err: any) {
        setError(err.response.data);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Nav />
      <div className="mt-[20vh] flex flex-col gap-[5vh] items-center">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error error={error} />
        ) : (
          posts.map((post) => (
            <div
              key={post._id as string}
              className="flex flex-col gap-[1vh] border-solid border w-fit h-fit p-[10vw] items-start sm:items-center"
            >
              <h1 className="text-[1.6rem]">Event Name: {post.name}</h1>
              <h2 className="text-[1.4rem]">
                This meetup is in {post.country} at {post.location}
              </h2>
              <h2>This event will take place on {post.date}</h2>
              <h2 className="text-[1.2rem]">
                This Event is hosted by: {post.author}
              </h2>
            </div>
          ))
        )}
      </div>
    </>
  );
}
