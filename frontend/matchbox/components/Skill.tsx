interface SkillProps {
  skillsOff: string[];
}

export default function SwipeCard({ skillsOff }: SkillProps) {
  return (
    <div className="flex justify-center items-center text-center w-auto h-[25px] rounded-md bg-gray-200">
      <p>skill</p>
    </div>
  );
}
