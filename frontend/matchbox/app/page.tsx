import SwipeCard from "@/components/SwipeCard";
import BottomTab from "@/components/BottomTab";

export default function Homepage() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow flex justify-center items-center">
        <SwipeCard />
      </div>
      <div className="flex-shrink-0">
        <BottomTab />
      </div>
    </div>
  );
}
