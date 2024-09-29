
const skills = ["Python", "Java", "React"]

export default function SkillsChecklist() {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Skills</label>
      <div className="mt-2 space-y-2">
        {skills.map((skill) => (
          <div key={skill} className="flex items-center">
            <input
              id={skill}
              name={skill}
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor={skill} className="ml-2 block text-sm text-gray-900">
              {skill}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
