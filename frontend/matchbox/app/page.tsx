"use client";

import SwipeCard from "@/components/SwipeCard";
import BottomTab from "@/components/BottomTab";
import FilterMenu from "@/components/FilterMenu";

export default function Homepage() {

  return (
    <div className="flex flex-col h-[100vh] justify-end">
      <FilterMenu />
      <div className="flex justify-center align-center">
=======
    <div className="relative flex flex-col h-screen">
      <FilterMenu />
      <div className="flex-grow flex justify-center items-center">
        <SwipeCard />
      </div>
      <div className="flex justify-center align-center">
        <BottomTab />
      </div>
    </div>
  );

}
