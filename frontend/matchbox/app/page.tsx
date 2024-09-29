"use client";

import SwipeCard from "@/components/SwipeCard";
import BottomTab from "@/components/BottomTab";
import FilterMenu from "@/components/FilterMenu";
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
    <div className="flex flex-col h-[100vh] justify-end">
      <div className="flex justify-center align-center">
        <SwipeCard />
      </div>
      <div className="flex justify-center align-center">
        <BottomTab />
      </div>
    </div>
  );
}
