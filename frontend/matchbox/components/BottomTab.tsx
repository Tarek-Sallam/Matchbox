export default function BottomTab() {
  return (
    <div className="flex justify-around items-center p-4 bg-white border-t border-gray-200">
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
