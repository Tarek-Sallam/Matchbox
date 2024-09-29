"use client";

import SwipeCard from "@/components/SwipeCard";
import BottomTab from "@/components/BottomTab";
import FilterMenu from "@/components/FilterMenu";

import { useEffect, useState } from "react";

export default function Homepage() {
  const URLBase = "http://127.0.0.1:5000";

  const [myUserStringData, setUserStringData] = useState<any[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [startX, setStartX] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // profile states
  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [skillsOff, setSkillsOff] = useState<string>("");
  const [skillsLearn, setSkillsLearn] = useState<string[]>([]);
  const [uni, setUni] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [major, setMajor] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    const fetchProfiles = async () => {
      const userId = localStorage.getItem("userId");
      console.log("User ID found in fetchProfiles:", userId);

      const response = await fetch(
        `${URLBase}/match/get_potential_matches?user_id=${localStorage.getItem(
          "userId"
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (userId === null) {
        console.log("User ID is null");
      }

      const data = await response.json();

      console.log(JSON.stringify(data));
      const userIds = data.user_ids;
      console.log("User IDs:", userIds);
      for (const id of userIds) {
        console.log("ID:", id);
        const userResponse = await fetch(
          `${URLBase}/user/get_profile?uid=${localStorage.getItem("userId")}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const Userdata = await userResponse.json();
        const userStringData = JSON.stringify(Userdata);
        const userObject = JSON.parse(userStringData);
        setImageUrls(userObject.photo_url);
        //sets
        setFname(userObject.fname);
        setLname(userObject.lname);
        setSkillsOff(userObject.skills_to_offer);
        setSkillsLearn(
          Array.isArray(userObject.skills_to_learn)
            ? userObject.skills_to_learn
            : []
        );
        setUni(userObject.school);
        setBio(userObject.bio);
        setMajor(userObject.major);
        setYear(userObject.year);
        setUrl(userObject.photo_url);

        setUserStringData((prevData) => [...prevData, userObject]);
      }
    };

    fetchProfiles();
  }, []);

  const onCardLeftScreen = (id: string) => {
    console.log(`Card with id ${id} left the screen`);
    // Move to the next card
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const onSwipe = (dir: string, id: string) => {
    console.log(`Swiped ${dir} on card with id ${id}`);
    // Move to the next card
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setStartX(touch.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    // Prevent default behavior to avoid scrolling
    e.preventDefault();
  };

  const handleTouchEnd = (e: React.TouchEvent, id: string) => {
    if (startX === null) return;

    const touch = e.changedTouches[0];
    const endX = touch.clientX;
    const diffX = endX - startX;

    if (Math.abs(diffX) > 50) {
      const direction = diffX > 0 ? "right" : "left";
      onSwipe(direction, id);
    }

    setStartX(null);
  };

  useEffect(() => {
    const touchMoveHandler = (e: TouchEvent) => handleTouchMove(e);

    document.addEventListener("touchmove", touchMoveHandler, {
      passive: false,
    });

    return () => {
      document.removeEventListener("touchmove", touchMoveHandler);
    };
  }, []);

  return (
    <div className="flex flex-col h-[100vh] justify-end">
      <FilterMenu />
      <div className="flex-grow flex justify-center items-center relative">
        {myUserStringData.slice(currentIndex).map((userObject, index) => (
          <div
            key={index}
            className={`absolute ${index === 0 ? "z-10" : "z-0"}`}
            onTouchStart={handleTouchStart}
            onTouchEnd={(e) => handleTouchEnd(e, userObject.id)}
          >
            <SwipeCard
              fname={fname}
              lname={lname}
              skillsOff={[skillsOff]}
              skillsLearn={skillsLearn}
              uni={uni}
              bio={bio}
              major={major}
              year={year}
              url={url}
              // onSwipe={onSwipe}
              imageUrls={userObject.photo_url}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center align-center">
        <BottomTab />
      </div>
    </div>
  );
}
