export default function BottomTab() {
  return (
    <div className="flex flex-row p-4 w-auto bg-white gap-10">
      <div>
        <a href="#">
          <span className="material-symbols-outlined">home</span>
        </a>
      </div>
      <div>
        <a href="#">
          <span className="material-symbols-outlined">account_circle</span>
        </a>
      </div>
      <div>
        <a href="#">
          <span className="material-symbols-outlined">add_box</span>
        </a>
      </div>
    </div>
  );
}
