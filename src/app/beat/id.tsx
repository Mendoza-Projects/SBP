import { useEffect, useState } from "react";
import { useBeats } from "../Context/beatcontext";
import { useRouter } from "next/router"; // Assuming you're using Next.js routing

const BeatIDPage = () => {
  const { youtubeUrls } = useBeats();
  const [beatUrl, setBeatUrl] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query; // This assumes that you are using dynamic routing like /beat/[id].tsx

  useEffect(() => {
    if (id) {
      const beatIndex = parseInt(id as string, 10); // Assuming the URL is like /beat/[id]
      if (beatIndex >= 0 && beatIndex < youtubeUrls.length) {
        setBeatUrl(youtubeUrls[beatIndex]); // Get the correct URL based on the beat index
      }
    }
  }, [id, youtubeUrls]); // Re-run if id or youtubeUrls change

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Beat {id}</h1>
      {beatUrl ? (
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${beatUrl.split('v=')[1]}`}
          title="YouTube video"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      ) : (
        <p>No beat found</p>
      )}
    </div>
  );
};

export default BeatIDPage;
