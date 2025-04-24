import React from "react";

function Navbar() {
  const toggleSearch = () => {
    console.log("To do!");
  };

  return (
    <div
      onClick={toggleSearch}
      className="bg-stone-900 h-10 fixed inset-0 z-1 pointer-events-none"
    >
      <button
        className="rounded-full p-2 font-bold fixed top-[1/2] left-1 
      hover:bg-green-900 pointer-events-auto"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </div>
  );
}

export default Navbar;
