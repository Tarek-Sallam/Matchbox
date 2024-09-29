import SkillsChecklist from "@/components/SkillsChecklist";
import YearInput from "@/components/YearInput";

interface FilterDropdownProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function FilteredDropdown({ isVisible, onClose }: FilterDropdownProps) {
  if (!isVisible) return null;
  return (
    <div className="absolute top-0 left-0 w-full bg-white p-4 shadow-lg z-10">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <YearInput label="Min Year" id="minYear" />
        </div>
        <div className="flex items-center space-x-2">
          <YearInput label="Max Year" id="maxYear" />
        </div>
        <SkillsChecklist />
      </div>
    </div>
  );
};

