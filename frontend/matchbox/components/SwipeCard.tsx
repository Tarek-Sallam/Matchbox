"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Skill from "./Skill";
import { useSwipeable } from "react-swipeable";
import { image } from "framer-motion/client";

interface SwipeCardProps {
  fname: string;
  lname: string;
  skillsOff: string[];
  skillsLearn: string[];
  uni: string;
  bio: string;
  major: string;
  year: string;
  url: string;
  imageUrls: string[];
}

export default function SwipeCard({
  fname,
  lname,
  skillsOff,
  skillsLearn,
  uni,
  bio,
  major,
  year,
  url,
  imageUrls,
}: SwipeCardProps) {
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
        src={"/images/placeholder.svg"}
        alt={"Name not available"}
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0"
      />
      <div className="absolute bottom-0 z-10 p-4 text-white w-full">
        <h1 className="text-2xl font-bold">
          {fname} {lname} - {year}
        </h1>
        <p className="text-lg">{uni}</p>
        <div className="grid grid-cols-3 gap-4">
          <Skill skillsOff={skillsOff} />
          <Skill skillsOff={skillsOff} />
          <Skill skillsOff={skillsOff} />
        </div>
      </div>
    </div>
  );
}
