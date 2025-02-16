"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the beat object
interface Beat {
  id: string;
  title: string;
  youtubeUrl: string;
  bpm: string;
  key: string;
}

// Define the BeatContextType to match the context's data structure
interface BeatContextType {
  beats: Beat[];
  updateBeat: (index: number, youtubeUrl: string) => void; // Update function for YouTube URL
}

const BeatContext = createContext<BeatContextType | undefined>(undefined);

export const BeatProvider = ({ children }: { children: ReactNode }) => {
  const [beats, setBeats] = useState<Beat[]>([
    // Default data or empty state can go here
    {
      id: "1",
      title: "Beat 1",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      bpm: "120",
      key: "C",
    },
    {
      id: "2",
      title: "Beat 2",
      youtubeUrl: "https://www.youtube.com/watch?v=1v5c8hbPtbE",
      bpm: "128",
      key: "D",
    },
  ]);

  const updateBeat = (index: number, youtubeUrl: string) => {
    setBeats((prevBeats) => {
      const newBeats = [...prevBeats];
      newBeats[index].youtubeUrl = youtubeUrl; // Update the youtubeUrl for the specific beat
      return newBeats;
    });
  };

  return (
    <BeatContext.Provider value={{ beats, updateBeat }}>
      {children}
    </BeatContext.Provider>
  );
};

// Custom hook to access the beat context
export const useBeats = () => {
  const context = useContext(BeatContext);
  if (!context) {
    throw new Error("useBeats must be used within a BeatProvider");
  }
  return context;
};
