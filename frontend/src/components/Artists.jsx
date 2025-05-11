// Zephaniah Gustafson and Koushik Shaganti
// https://www.theaudiodb.com/free_music_api

import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Slideshow from "./Slideshow";

function Artists() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [artistData, setArtistData] = useState(null);
  const [videoData, setVideoData] = useState(null);
  const [likedSongs, setLikedSongs] = useState([]);
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (query) {
      searchArtist(query);
    }
  }, [query]);

  useEffect(() => {
    if (videoData && userEmail) {
      fetchLikedSongs();
    }
  }, [videoData, userEmail]);

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
        searchVideos(data.artists[0].idArtist);
      } else {
        setArtistData(null);
        setVideoData(null);
      }
    } catch (error) {
      console.error("Error fetching artist:", error);
      setArtistData(null);
    }
  };

  const searchVideos = async (id) => {
    try {
      const response = await fetch(
        `https://www.theaudiodb.com/api/v1/json/523532/mvid.php?i=${id}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const text = await response.text();

      if (!text) {
        throw new Error("Empty response from API");
      }

      const data = JSON.parse(text);

      if (!Array.isArray(data.mvids)) {
        setVideoData(null);
        return;
      }

      let filteredData = data.mvids.filter(
        (vid) => vid.strTrackThumb && vid.strMusicVid
      );

      if (filteredData.length === 0) filteredData = null;

      setVideoData(filteredData ? [...filteredData] : null); // Create a new array
    } catch (error) {
      console.error("Error fetching videos:", error);
      setVideoData(null);
    }
  };

  const getImages = () => {
    const urls = [];

    if (artistData.strArtistThumb) urls.push(artistData.strArtistThumb);
    if (artistData.strArtistCutout) urls.push(artistData.strArtistCutout);
    if (artistData.strArtistFanart) urls.push(artistData.strArtistFanart);
    if (artistData.strArtistFanart2) urls.push(artistData.strArtistFanart2);
    if (artistData.strArtistFanart3) urls.push(artistData.strArtistFanart3);
    if (artistData.strArtistFanart4) urls.push(artistData.strArtistFanart4);

    return urls.map((src, i) => (
      <img
        key={i}
        src={src}
        alt={`Slide ${i}`}
        className="w-full h-auto object-contain flex-shrink-0"
      />
    ));
  };

  const fetchLikedSongs = async () => {
    try {
      const response = await fetch(`http://localhost:8080/artist/${userEmail}`);
      if (response.ok) {
        const textData = await response.text();

        try {
          const data = JSON.parse(textData);
          if (data && data.likedSongs) {
            setLikedSongs(data.likedSongs);
          } else {
            setLikedSongs([]);
          }
        } catch (parseError) {
          console.error("Error parsing JSON:", parseError, textData);
          setLikedSongs([]);
        }
      } else if (response.status === 404) {
        setLikedSongs([]);
        await fetch("http://localhost:8080/artist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: userEmail }),
        });
      } else {
        console.error("Error fetching liked songs:", response.status);
      }
    } catch (error) {
      console.error("Error fetching liked songs:", error);
    }
  };

  const likeSong = async (video) => {
    if (!userEmail) {
      console.error("User not logged in.");
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/artist/like", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          song: {
            idTrack: video.idTrack,
            title: video.strTrack,
            artist: artistData.strArtist,
          },
        }),
      });
      if (response.ok) {
        setLikedSongs((prev) => [
          ...prev,
          {
            idTrack: video.idTrack, // Use idTrack here
            title: video.strTrack,
            artist: artistData.strArtist,
          },
        ]);
      } else {
        const errorData = await response.json();
        console.error("Error liking song:", errorData);
      }
    } catch (error) {
      console.error("Error liking song:", error);
    }
  };

  const unlikeSong = async (idTrack) => {
    if (!userEmail) {
      console.error("User not logged in.");
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/artist/unlike", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, songId: idTrack }),
      });
      if (response.ok) {
        setLikedSongs((prev) => prev.filter((v) => v.idTrack !== idTrack)); // Use idTrack here
      } else {
        const errorData = await response.json();
        console.error("Error unliking song:", errorData);
      }
    } catch (error) {
      console.error("Error unliking song:", error);
    }
  };

  useEffect(() => {
    console.log("likedSongs updated:", likedSongs);
  }, [likedSongs]);

  return (
    <div>
      <div>
        {artistData ? (
          <div className="mx-auto">
            <h1 className="text-6xl  bg-blue-500 font-bold text-white text-center mb-6 py-3">
              {artistData.strArtist}
            </h1>
            <div className="sm:w-md md:w-2xl my-2 mx-auto">
              <Slideshow>{getImages()}</Slideshow>
            </div>
            <div className="max-w-5xl mx-auto">
              <div className="bg-blue-500 w-sm h-3 rounded-full mt-8 mb-3"></div>
              <p className="indent-8 text-lg">{artistData.strBiographyEN}</p>
            </div>
          </div>
        ) : (
          <p className="mt-8 text-center">
            Sorry we could not find that artist.
          </p>
        )}
      </div>
      <div className="max-w-7xl mx-auto">
        {videoData ? (
          <div>
            <h2 className="text-4xl font-bold text-center py-4">
              Artist Songs
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {videoData.map((video) => {
                if (video.strTrackThumb) {
                  return (
                    <div
                      key={video.idTrack}
                      className="bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition relative"
                    >
                      <img
                        src={video.strTrackThumb}
                        alt={video.strTrack}
                        className="w-100 rounded-t-2xl"
                      />
                      <a
                        href={video.strMusicVid}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <h3 className="text-xl font-semibold text-center py-2 hover:font-bold">
                          {video.strTrack}
                        </h3>
                      </a>

                      <button
                        className="absolute right-1 bottom-1 z-20 pointer-events-auto"
                        onClick={() => {
                          const isLiked = likedSongs.some(
                            (song) =>
                              (song.idTrack || song.id) === video.idTrack
                          );
                          if (isLiked) {
                            unlikeSong(video.idTrack);
                          } else {
                            likeSong(video);
                          }
                        }}
                      >
                        {likedSongs.some(
                          (song) => song.idTrack === video.idTrack
                        ) ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-6 hover:size-7 text-red-500"
                          >
                            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6 hover:size-7"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Artists;
