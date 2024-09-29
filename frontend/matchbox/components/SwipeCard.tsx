"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Skill from "./Skill";
import { useSwipeable } from "react-swipeable";

export default function SwipeCard() {
  const [profile, setProfile] = useState({ name: "", school: "" });
  const [direction, setDirection] = useState("");

  const handlers = useSwipeable({
    onSwipedLeft: () => setDirection("left"),
    onSwipedRight: () => setDirection("right"),
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/get_profile?uid=<user_id>");
        const data = await response.json();
        if (data) {
          setProfile({
            name: `${data.fname} ${data.lname}`,
            school: data.school,
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
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
        <h1 className="text-2xl font-bold">Sean - 2nd Year</h1>
        <p className="text-lg">Carleton University</p>
        <div className="grid grid-cols-3 gap-4">
          <Skill />
          <Skill />
          <Skill />
        </div>
      </div>
    </div>
  );
}
