"use client";

import SwipeCard from "@/components/SwipeCard";
import BottomTab from "@/components/BottomTab";
import FilterMenu from "@/components/FilterMenu";

import { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";

export default function Homepage() {
  const URLBase = "http://127.0.0.1:5000";

  const [myUserStringData, setUserStringData] = useState<any[]>([]);

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
        // console.log(userStringData);
        setUserStringData((prevData) => [...prevData, userStringData]);
      }
    };

    fetchProfiles();
  }, []);

  const onCardLeftScreen = (id: string) => {
    console.log(`Card with id ${id} left the screen`);
  };

  const onSwipe = (dir: string, id: string) => {
    console.log(`Swiped ${dir} on card with id ${id}`);
    // Handle swipe logic here
  };

  const handleTouchStart = (e: React.TouchEvent, id: string) => {
    const touch = e.touches[0];
    (e.target as HTMLElement).dataset.startX = touch.clientX.toString();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Prevent default behavior to avoid scrolling
    e.preventDefault();
  };

  const handleTouchEnd = (e: React.TouchEvent, id: string) => {
    const touch = e.changedTouches[0];
    const startX = parseFloat((e.target as HTMLElement).dataset.startX || "0");
    const endX = touch.clientX;
    const diffX = endX - startX;

    if (Math.abs(diffX) > 50) {
      const direction = diffX > 0 ? "right" : "left";
      onSwipe(direction, id);
    }
  };

  return (
    <div className="flex flex-col h-[100vh] justify-end">
      <FilterMenu />
      <div className="flex-grow flex justify-center items-center relative">
        {myUserStringData.map((id, index) => (
          <div
            key={id}
            className={`absolute ${index === 0 ? "z-10" : "z-0"}`}
            onTouchStart={(e) => handleTouchStart(e, id)}
            onTouchMove={handleTouchMove}
            onTouchEnd={(e) => handleTouchEnd(e, id)}
          >
            <SwipeCard
              key={id}
              onSwipe={(dir) => onSwipe(dir, id)}
              onCardLeftScreen={() => onCardLeftScreen(id)}
              preventSwipe={["up", "down"]}
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
