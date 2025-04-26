// Zephaniah Gustafson and Koushik Shaganti
// https://www.theaudiodb.com/free_music_api

import React, { useState } from "react";

function Artists() {
  // ------------------------------------------------
  // BELOW CODE IS FOR TESTING THE API!!!
  // ------------------------------------------------
  const [artist, setArtist] = useState("");
  const [artistData, setArtistData] = useState(null);

  const searchArtist = async (name) => {
    try {
      const response = await fetch(
        `https://www.theaudiodb.com/api/v1/json/523532/search.php?s=${name}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const text = await response.text(); // get raw response text

      if (!text) {
        throw new Error("Empty response from API");
      }

      const data = JSON.parse(text); // parse it manually

      if (data.artists) {
        setArtistData(data.artists[0]);
      } else {
        setArtistData(null);
      }
    } catch (error) {
      console.error("Error fetching artist:", error);
      setArtistData(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchArtist(artist);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          placeholder="Search for an artist"
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Search
        </button>
      </form>

      {artistData && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">{artistData.strArtist}</h2>
          <img
            src={artistData.strArtistThumb}
            alt={artistData.strArtist}
            className="w-64 my-2"
          />
          <p>{artistData.strBiographyEN}</p>
        </div>
      )}
    </div>
  );
}

export default Artists;
