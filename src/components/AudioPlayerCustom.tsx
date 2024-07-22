import { audioDownloader } from "@utils/getAudioFile";
import { useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

export default function AudioPlayerCustom({ audio }: { audio: string }) {
  const [audioFile, setAudioFile] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePlay = async () => {
    if (!audioFile && !isLoading) {
      setIsLoading(true);
      try {
        const link = await audioDownloader(audio);
        setAudioFile(link);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <AudioPlayer
      src={audioFile ? audioFile : ""}
      onPlay={handlePlay}
      autoPlay={false}
    />
  );
}
