import { useState } from "react";
import FilterDropdown from "@/components/FilterDropdown";

export default function FilterMenu() {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  function toggleFilter(): void {
    setIsFilterVisible(!isFilterVisible);
  }

  function closeFilter(): void {
    setIsFilterVisible(false);
  }

  return (
    <div className="relative">
      <button
        onClick={toggleFilter}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        <span className="material-icons-outlined">tune</span>
      </button>
      <FilterDropdown isVisible={isFilterVisible} onClose={closeFilter} />
    </div>
  );
}