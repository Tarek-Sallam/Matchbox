import SwipeCard from "@/components/SwipeCard";
import BottomTab from "@/components/BottomTab";

export default function Homepage() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-center align-center">
        <SwipeCard />
      </div>
      <div className="flex justify-center align-center">
        <BottomTab />
      </div>
    </div>
  );
}
