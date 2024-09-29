"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Skill from "./Skill";
import { useSwipeable } from "react-swipeable";

export default function SwipeCard() {
  const URLBase = "http://127.0.0.1:5000";

  const [profile, setProfile] = useState<{
    name: string;
    school: string;
  } | null>(null);
  const [direction, setDirection] = useState("");

  const handlers = useSwipeable({
    onSwipedLeft: () => setDirection("left"),
    onSwipedRight: () => setDirection("right"),
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${URLBase}/get_profile`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProfile({ name: data.name, school: data.school });
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div {...handlers} className="relative w-[80vw] h-[80vh] m-auto">
      <Image
        src="/images/placeholder.svg"
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0"
      />
      <div className="absolute bottom-0 z-10 p-4 text-white w-full">
        <h1 className="text-2xl font-bold">
          {profile?.name || "Name not available"}
        </h1>
        <p className="text-lg">{profile?.school || "School not available"}</p>
        <div className="grid grid-cols-3 gap-4">
          <Skill />
          <Skill />
          <Skill />
        </div>
      </div>
    </div>
  );
}
