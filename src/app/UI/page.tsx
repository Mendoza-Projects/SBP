'use client';

import { useState, useEffect } from "react";
import { useBeats } from "../Context/beatcontext";

const UIPage = () => {
  // Call hooks unconditionally at the top level
  const { youtubeUrls, updateYoutubeUrls } = useBeats();
  
  // Define local state
  const [inputUrls, setInputUrls] = useState<string[]>(new Array(5).fill("")); // Track input fields locally

  // Load existing YouTube URLs from localStorage on component mount
  useEffect(() => {
    if (!youtubeUrls || !updateYoutubeUrls) {
      console.error("Error: youtubeUrls or updateYoutubeUrls not found in context.");
      return; // Prevent further execution if context is not found
    }

    const storedUrls = localStorage.getItem("youtubeUrls");
    if (storedUrls) {
      const parsedUrls = JSON.parse(storedUrls);
      setInputUrls(parsedUrls);
      console.log("📥 Loaded YouTube URLs:", parsedUrls);
    }
  }, [youtubeUrls, updateYoutubeUrls]); // Make sure these dependencies are listed here

  // Handle input changes and update local state
  const handleInputChange = (index: number, value: string) => {
    const updatedUrls = [...inputUrls];
    updatedUrls[index] = value;
    setInputUrls(updatedUrls);
    console.log(`🔄 Updated input URL for Beat ${index + 1}:`, value);
  };

  // Submit function for updating YouTube URLs
  const handleSubmit = (index: number, e: React.FormEvent) => {
    e.preventDefault();
    const url = inputUrls[index].trim();
    if (!url) {
      console.warn(`⚠️ No URL entered for Beat ${index + 1}`);
      return;
    }

    console.log(`📤 Sending YouTube URL for Beat ${index + 1}:`, url);

    // Update local state and global context with new URL
    const updatedUrls = [...inputUrls];
    updatedUrls[index] = url;
    setInputUrls(updatedUrls); // Update local state
    localStorage.setItem("youtubeUrls", JSON.stringify(updatedUrls)); // Save to localStorage

    // Update the global state in context
    updateYoutubeUrls(updatedUrls);
    console.log("Updated YouTube URLs:", updatedUrls);
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Enter YouTube Links</h1>
      <form className="space-y-4">
        {inputUrls.map((url, index) => (
          <div key={index} className="space-y-2">
            <input
              type="text"
              value={url}
              onChange={(e) => handleInputChange(index, e.target.value)}
              placeholder={`Paste YouTube URL for Beat ${index + 1}`}
              className="w-full p-2 text-black rounded"
            />
            <button
              type="submit"
              onClick={(e) => handleSubmit(index, e)}
              className="p-2 bg-blue-500 rounded"
            >
              Submit for Beat {index + 1}
            </button>
          </div>
        ))}
      </form>
    </div>
  );
};

export default UIPage;
