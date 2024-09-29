import Link from "next/link";

export default function BottomTab() {
  return (
    <div className="flex flex-row p-4 w-auto bg-white gap-20">
      <Link href="/">
        <span className="material-symbols-outlined">sms</span>
      </Link>
      <Link href="../profile">
        <span className="material-symbols-outlined">account_circle</span>
      </Link>
      <Link href="../login">
        <span className="material-symbols-outlined">home</span>
      </Link>
    </div>
  );
}
