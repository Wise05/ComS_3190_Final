import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search({ setOpenSearchBar }) {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) {
      navigate(`/artists?q=${encodeURIComponent(input)}`);
    }
    setOpenSearchBar(false);
  };

  return (
    <div className="bg-black p-3 min-h-screen z-0 w-80 fixed left-0 top-10 pointer-events-auto">
      <h2 className="text-center text-4xl font-bold pb-8">
        Find the artists you love
      </h2>
      <form onSubmit={handleSearch} className="flex justify-center">
        <input
          type="text"
          placeholder="Search . . . "
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          className="bg-white text-black outline-none p-2 rounded-l-xl"
        />
        <button
          type="submit"
          className="px-3 py-2 bg-blue-500 text-white rounded-r-xl"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default Search;
