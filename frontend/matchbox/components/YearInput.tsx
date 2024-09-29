interface YearInputProps {
  label: string;
  id: string;
}

export default function YearInput({label, id}: YearInputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="number"
        id={id}
        className="mt-1 block w-24 border border-gray-300 rounded-md shadow-sm"
      />
    </div>
  );
}
