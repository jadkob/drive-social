"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { Button } from "@/components/ui/button";
import * as jwt from "jsonwebtoken";
import { Post } from "../types";
import Loading from "../customComponents/Loading";

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
        const res = await axios.get("/api/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(res.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleRSVP = async (postId: string) => {
    try {
      const res = await axios.post(
        "/api/posts/rsvp",
        { postId },
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      alert("RSVPed succesfully");
      // Update the post in the state with the new data returned from the server
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, rsvps: [...post.rsvps, username] }
            : post
        )
      );
    } catch (err: any) {
      console.error(err.message);
      alert(err.response?.data || "An error occurred");
    }
  };

  return (
    <div className="mt-[20vh] flex flex-col gap-[5vh] items-center">
      {loading ? (
        <Loading />
      ) : error ? (
        <p>{error}</p>
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
            <h2>This event will take place on {post.Date}</h2>
            <h2 className="text-[1.2rem]">
              This Event is hosted by: {post.author}
            </h2>
            {!post.rsvps.includes(username) ? (
              <Button onClick={() => handleRSVP(post._id as string)}>
                RSVP for this event
              </Button>
            ) : (
              <h1 className="mt-[3vh]">RSVPed To {post.name}</h1>
            )}
          </div>
        ))
      )}
    </div>
  );
}
