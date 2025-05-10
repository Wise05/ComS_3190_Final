import React from "react";
import { Link } from "react-router-dom";
import Melodify_Logo from "../assets/Melodify_Logo.png";
import Search from "./Search";
import { useEffect } from "react";

function Navbar({ openSearchBar, setOpenSearchBar }) {
  const isSignedIn = localStorage.getItem("userEmail");
  useEffect(() => {}, [isSignedIn]);
  return (
    <div className="bg-stone-900 h-10 fixed flex inset-0 z-1 text-white">
      <div className="pl-3 flex gap-3 h-10">
        <Link
          to="/"
          className="rounded-full p-2 font-bold flex gap-2
      hover:bg-blue-600 pointer-events-auto"
        >
          <img src={Melodify_Logo} alt="Melodify Logo" />
          <p>Melodify</p>
        </Link>
        <button
          onClick={() => {
            openSearchBar ? setOpenSearchBar(false) : setOpenSearchBar(true);
          }}
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
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>

          <p>Shop</p>
        </Link>
      </div>
      <div className="h-10 ml-auto pr-3">
        {isSignedIn ? (
          <Link
            to="/profile"
            className="rounded-full p-2 font-bold flex gap-2
    hover:bg-blue-600 pointer-events-auto"
          >
            <p>Profile</p>
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
        ) : (
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
        )}
      </div>
      {openSearchBar ? <Search setOpenSearchBar={setOpenSearchBar} /> : ""}
    </div>
  );
}

export default Navbar;
