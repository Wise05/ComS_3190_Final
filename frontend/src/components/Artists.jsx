// Zephaniah Gustafson and Koushik Shaganti
// https://www.theaudiodb.com/free_music_api

import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Slideshow from "./Slideshow";
import YouTubePlayer from "./YouTubePlayer";

function Artists() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [artistData, setArtistData] = useState(null);
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    if (query) {
      setArtistData(searchArtist(query));
    }
  }, [query]);

  useEffect(() => {
    if (videoData) {
      console.log("Updated videoData:", videoData);
    }
  }, [videoData]);

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

      if (!data.mvids || !Array.isArray(data.mvids)) {
        throw new Error("Invalid or missing 'mvid' field in response");
      }

      const videoIds = data.mvids
        .map((video) => {
          try {
            const parsedUrl = new URL(video.strMusicVid);
            return parsedUrl.searchParams.get("v");
          } catch {
            return null;
          }
        })
        .filter((id) => id);

      setVideoData(videoIds);
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

  return (
    <div className="p-4 max-w-5xl mx-auto">
      {artistData ? (
        <div className="mt-4">
          <h1 className="text-6xl font-bold text-center pb-6">
            {artistData.strArtist}
          </h1>
          <div className="w-2xl my-2 mx-auto">
            <Slideshow>{getImages()}</Slideshow>
          </div>
          <p className="indent-8 pt-5 text-lg">{artistData.strBiographyEN}</p>
        </div>
      ) : (
        <p>Sorry we could not find that artist.</p>
      )}
      {videoData ? (
        <div>
          <h2 className="text-4xl font-bold text-center py-4">Artist Songs</h2>
          {videoData.map((id) => {
            <YouTubePlayer videoId={id} />;
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Artists;
