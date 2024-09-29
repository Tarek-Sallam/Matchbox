import Image from "next/image";
import Skill from "./Skill";

export default function SwipeCard() {
  return (
    <div className="relative w-[80vw] h-[80vh] m-auto">
      <Image
        src="/images/placeholder.svg"
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0"
      />
      <div className="absolute bottom-0 z-10 p-4 text-white w-full">
        <h1 className="text-2xl font-bold">Name - Age</h1>
        <p className="text-lg">School</p>
        <div className="grid grid-cols-3 gap-4">
          <Skill />
          <Skill />
          <Skill />
        </div>
      </div>
    </div>
  );
}
