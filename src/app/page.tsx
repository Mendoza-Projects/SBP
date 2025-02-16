'use client';

import { useState, useEffect } from "react";
import { useBeats } from "./Context/beatcontext";

const Home = () => {
  const { youtubeUrls } = useBeats(); // Get the global youtubeUrls from context
  const [playingVideo, setPlayingVideo] = useState<number | null>(null); // Track which video is playing

  // Handle clicking on a thumbnail to start playing the video
  const handleThumbnailClick = (index: number) => {
    setPlayingVideo(index); // Set the clicked video index to be played
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Our Featured Beats</h1>

      {/* Beat cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4 mt-6">
        {youtubeUrls.map((url, index) => {
          if (!url) return null; // Skip if no URL is available

          const videoId = url.split("v=")[1]?.split("&")[0]; // Extract video ID
          const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`; // Get thumbnail URL

          return (
            <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-white mb-2">Beat {index + 1}</h3>

              {playingVideo === index ? (
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  title={`YouTube video - Beat ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <img
                  src={thumbnailUrl}
                  alt={`YouTube Thumbnail for Beat ${index + 1}`}
                  className="w-full h-48 object-cover cursor-pointer"
                  onClick={() => handleThumbnailClick(index)} // Play video on click
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
