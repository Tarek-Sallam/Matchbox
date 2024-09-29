"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Skill from "./Skill";
import { useSwipeable } from "react-swipeable";

interface SwipeCardProps {
  onSwipe: (direction: string, id: string) => void;
  onCardLeftScreen: (direction: string, id: string) => void;
  preventSwipe: string[];
}

export default function SwipeCard({}: // onSwipe,
// onCardLeftScreen,
// preventSwipe,
SwipeCardProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const URLBase = "http://127.0.0.1:5000";

  const [profile, setProfile] = useState<{
    name: string;
    school: string;
  } | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
      console.log("User ID found in localStorage:", storedUserId);
    }
  }, []);

  return (
    <div className="relative w-[80vw] h-[80vh] m-auto rounded-lg">
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
