"use client";

import SwipeCard from "@/components/SwipeCard";
import BottomTab from "@/components/BottomTab";
import FilterDropdown from "@/components/FilterDropdown";
import { useState } from "react";

export default function Homepage() {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  function toggleFilter(event: React.MouseEvent<HTMLButtonElement>): void {
    setIsFilterVisible(!isFilterVisible);
  }

  function closeFilter(): void {
    setIsFilterVisible(false);
  }


  return (
    <div className="relative flex flex-col h-screen">
      <button
        onClick={toggleFilter}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        <span className="material-icons-outlined">tune</span>
      </button>
      <FilterDropdown isVisible={isFilterVisible} onClose={closeFilter} />
      <div className="flex-grow flex justify-center items-center">
        <SwipeCard />
      </div>
      <div className="flex-shrink-0">
        <BottomTab />
      </div>
    </div>
  );

}
