import React from "react";
import { Link } from "react-router-dom";
import Melodify_Logo from "../assets/Melodify_Logo.png";

function Navbar() {
  const toggleSearch = () => {
    console.log("To do!");
  };

  return (
    <div className="bg-stone-900 h-10 fixed flex inset-0 z-1 pointer-events-none text-white">
      <div className="pl-3 flex gap-3 h-10">
        <Link
          to="/"
          className="rounded-full p-2 font-bold flex gap-2
      hover:bg-blue-600 pointer-events-auto"
        >
          <img src={Melodify_Logo} alt="Melodify Logo" />
          <p>Home</p>
        </Link>
        <button
          onClick={toggleSearch}
          className="rounded-full p-2 font-bold flex gap-2
      hover:bg-blue-600 pointer-events-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>

          <p>Search</p>
        </button>
        <Link
          to="/shop"
          className="rounded-full p-2 font-bold flex gap-2
      hover:bg-blue-600 pointer-events-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
          <p>Shop</p>
        </Link>
      </div>
      <div className="h-10 ml-auto pr-3">
        <Link
          to="/login"
          className="rounded-full p-2 font-bold flex gap-2
      hover:bg-blue-600 pointer-events-auto"
        >
          <p>Login</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
