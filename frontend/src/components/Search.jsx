import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";

function Search({ setOpenSearchBar }) {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const [filteredSearchOptions, setFilteredSearchOptions] = useState([]);

  const options = [
    "Drake",
    "Taylor Swift",
    "Eminem",
    "Michael Jackson",
    "Lady Gaga",
    "Elton John",
    "Rihanna",
    "Kendrick Lamar",
    "Lana Del Rey",
    "The Weeknd",
    "Ariana Grande",
    "Katy Perry",
    "Elvis Presley",
    "Billie Eilish",
    "Bob Marley",
    "Madonna",
    "Justin Bieber",
    "Ed Sheeran",
    "Adele",
    "Post Malone",
    "The Beatles",
    "The Beach Boys",
    "AC/DC",
    "Led Zeppelin",
    "Pink Floyd",
    "Nirvana",
    "Radiohead",
    "Coldplay",
    "Arctic Monkeys",
    "The Strokes",
    "Beethoven",
    "Johann Sebastian Bach",
    "Claude Debussy",
  ];

  useEffect(() => {
    // Filter options based on input
    if (input.trim() === "") {
      setFilteredSearchOptions(options);
    } else {
      const filtered = options.filter((option) =>
        option.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredSearchOptions(filtered);
    }
  }, [input]);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (input.trim()) {
      navigate(`/artists?q=${encodeURIComponent(input)}`);
    }
    setOpenSearchBar(false);
  };

  const handleOptionClick = (option) => {
    setInput(option);
    // Need setTimeout to ensure setInput completes before handleSearch runs
    setTimeout(() => {
      handleSearch;
    }, 10);
  };

  return (
    <div className="bg-black p-3 min-h-screen z-0 w-80 fixed left-0 top-10 pointer-events-auto">
      <h2 className="text-center text-4xl font-bold pb-8">
        Find the artists you love
      </h2>
      <div className="w-full max-w-md mx-auto p-4">
        <div className="relative">
          <form onSubmit={handleSearch}>
            <div className="flex items-center rounded-lg overflow-hidden">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search..."
                className="bg-white text-black outline-none p-2 rounded-l-xl"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-blue-500 text-white rounded-r-xl hover:bg-blue-400"
              >
                Search
              </button>
            </div>
          </form>

          {filteredSearchOptions.length > 0 && (
            <div className="mt-1 bg-white text-black rounded-lg shadow-lg z-10 max-h-30 sm:max-h-50 md:max-h-100 overflow-y-auto">
              {filteredSearchOptions.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
{
  /* <form onSubmit={handleSearch} className="flex justify-center">
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
      </form> */
}
