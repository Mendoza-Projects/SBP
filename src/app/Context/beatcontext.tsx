'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define the context type
type BeatContextType = {
  youtubeUrls: string[]; // Store URLs as an array of strings
  updateYoutubeUrls: (updatedUrls: string[]) => void; // Update function to handle youtubeUrls
};

// Create the context
const BeatContext = createContext<BeatContextType | undefined>(undefined);

// Provider component
export const BeatProvider = ({ children }: { children: ReactNode }) => {
  const [youtubeUrls, setYoutubeUrls] = useState<string[]>(new Array(5).fill(""));

  // Load existing YouTube URLs from localStorage on component mount
  useEffect(() => {
    const storedUrls = localStorage.getItem("youtubeUrls");
    if (storedUrls) {
      const parsedUrls = JSON.parse(storedUrls);
      setYoutubeUrls(parsedUrls);
      console.log("📥 Loaded YouTube URLs from localStorage:", parsedUrls);
    }
  }, []);

  // Update the youtubeUrls state and localStorage
  const updateYoutubeUrls = (updatedUrls: string[]) => {
    setYoutubeUrls(updatedUrls);
    localStorage.setItem("youtubeUrls", JSON.stringify(updatedUrls)); // Save the updated URLs to localStorage
    console.log("🚀 Updated YouTube URLs:", updatedUrls); // Add a log for debugging
  };

  return (
    <BeatContext.Provider value={{ youtubeUrls, updateYoutubeUrls }}>
      {children}
    </BeatContext.Provider>
  );
};

// Custom hook to access the context
export const useBeats = (): BeatContextType => {
  const context = useContext(BeatContext);
  if (!context) {
    throw new Error("useBeats must be used within a BeatProvider");
  }
  return context;
};
