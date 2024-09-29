"use client";

import SwipeCard from "@/components/SwipeCard";
import BottomTab from "@/components/BottomTab";
import FilterMenu from "@/components/FilterMenu";

import { useEffect, useState } from "react";

export default function Homepage() {
  const URLBase = "http://127.0.0.1:5000";

  const [myUserStringData, setUserStringData] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [startX, setStartX] = useState<number | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      const userId = localStorage.getItem("userId");
      console.log("User ID found in fetchProfiles:", userId);

      const response = await fetch(
        `${URLBase}/match/get_potential_matches?user_id=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (userId === null) {
        console.log("User ID is null");
        return;
      }

      const data = await response.json();
      const userIds = data.user_ids;

      const userProfiles = await Promise.all(
        userIds.map(async (id: string) => {
          const userResponse = await fetch(
            `${URLBase}/user/get_profile?uid=${id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          return await userResponse.json();
        })
      );

      setUserStringData(userProfiles);
    };

    fetchProfiles();
  }, []);

  const onSwipe = (dir: string, id: string) => {
    console.log(`Swiped ${dir} on card with id ${id}`);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setStartX(touch.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
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
        {myUserStringData
          .slice(currentIndex, currentIndex + 10)
          .map((userObject, index) => (
            <div
              key={index}
              className={`absolute ${index === 0 ? "z-10" : "z-0"}`}
              onTouchStart={handleTouchStart}
              onTouchEnd={(e) => handleTouchEnd(e, userObject.id)}
            >
              <SwipeCard
                fname={userObject.fname}
                lname={userObject.lname}
                skillsOff={[userObject.skills_to_offer]}
                skillsLearn={userObject.skills_to_learn}
                uni={userObject.school}
                bio={userObject.bio}
                major={userObject.major}
                year={userObject.year}
                url={userObject.photo_url}
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
