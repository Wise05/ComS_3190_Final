import React from "react";
import Slideshow from "./Slideshow";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

function Home() {
  const { setOpenSearchBar } = useOutletContext();
  const isSignedIn = localStorage.getItem("userEmail");

  const stockMusicianPhotos = [
    "https://media.istockphoto.com/id/1125877063/photo/mixed-race-woman-singing-and-playing-guitar.jpg?s=612x612&w=0&k=20&c=23unW_Ugni5lUvAY2nccGkxtWQ5FtkiWgRyyN6wZMFs=",
    "https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://st.depositphotos.com/1550494/1782/i/450/depositphotos_17821089-stock-photo-vintage-black-african-american-jazz.jpg",
    "https://cdn.pixabay.com/photo/2022/07/04/04/37/musician-7300353_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/11/19/09/57/violins-1838390_1280.jpg",
  ];

  return (
    <div className="mx-auto max-w-7xl p-6 mt-10 flex gap-7 flex-wrap justify-center">
      <div className="py-9 w-auto h-auto ">
        <div className="bg-blue-500 w-xs h-3 rounded-full my-5"></div>
        <h1 className="text-4xl font-bold">Find the artists you love.</h1>
        <h1 className="text-4xl font-bold my-10">Shop for their merch.</h1>
        <h1 className="text-4xl font-bold">Review your favorites.</h1>
        <div className="mt-8 flex justify-center gap-3">
          {isSignedIn ? (
            <Link
              to="/profile"
              className="bg-blue-500 px-4 py-2 rounded-full font-semi-bold text-white mt-3 hover:bg-blue-400"
            >
              Profile
            </Link>
          ) : (
            <Link
              to="/login"
              className="bg-blue-500 px-4 py-2 rounded-full font-semi-bold text-white mt-3 hover:bg-blue-400"
            >
              Login
            </Link>
          )}

          <button
            onClick={() => {
              setOpenSearchBar(true);
            }}
            className="bg-blue-500 px-4 py-2 rounded-full font-semi-bold text-white mt-3 hover:bg-blue-400"
          >
            Search
          </button>
          <Link
            to="/shop"
            className="bg-blue-500 px-4 py-2 rounded-full font-semi-bold text-white mt-3 hover:bg-blue-400"
          >
            Shop
          </Link>
        </div>
      </div>
      <div className="max-w-175 shadow-xl/50">
        <Slideshow autoSlide={true}>
          {stockMusicianPhotos.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Slide ${i}`}
              className="w-full h-auto object-contain flex-shrink-0"
            />
          ))}
        </Slideshow>
      </div>
    </div>
  );
}

export default Home;
