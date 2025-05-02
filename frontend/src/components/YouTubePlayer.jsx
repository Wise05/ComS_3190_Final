import { useEffect, useRef } from "react";

export default function YouTubePlayer({ videoId }) {
  const playerRef = useRef(null);

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      new window.YT.Player(playerRef.current, {
        height: "390",
        width: "640",
        videoId: videoId,
        events: {
          onReady: (event) => {
            console.log("Player ready", event);
          },
          onStateChange: (event) => {
            console.log("Player state changed", event.data);
          },
        },
      });
    };
  }, [videoId]);

  return <div ref={playerRef}></div>;
}
