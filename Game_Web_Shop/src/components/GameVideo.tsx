import { AspectRatio } from "@chakra-ui/react";
import { TrailerResult } from "@/types/Game";

const GameVideo = ({ trailer }: { trailer: TrailerResult }) => {
  const videoUrl = trailer.data["480"];

  return (
    <AspectRatio maxW="100%" height="200px" ratio={16 / 9}>
      <a href={videoUrl} target="_blank" rel="noopener noreferrer">
        <video
          src={`${videoUrl}#t=0.1`}
          autoPlay
          muted
          playsInline
          loop
          style={{ width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" }}
        />
      </a>
    </AspectRatio>
  );
};

export default GameVideo;
