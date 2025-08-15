"use client";
import MuxPlayer from "@mux/mux-player-react";
import { useMediaDimensions } from "../hooks/media";

type ResponsiveVideoProps = {
  video: {
    playbackId: string;
    aspectRatio: number;
    originalFilename: string;
  };
  autoPlay?: boolean | string;
  muted?: boolean;
  loop?: boolean;
  maxWidthOfViewportAsPercentage?: number;
};

export default function ResponsiveVideo({
  video,
  autoPlay,
  muted,
  loop,
  maxWidthOfViewportAsPercentage,
}: ResponsiveVideoProps) {
  const mediaDimensions = useMediaDimensions(maxWidthOfViewportAsPercentage, maxWidthOfViewportAsPercentage);
  const maxWidth = mediaDimensions.width;

  const { playbackId, aspectRatio, originalFilename } = video || {};

  const posterUrl = `https://image.mux.com/${playbackId}/thumbnail.jpg`;

  return (
    <div
      style={{
        width: "100%",
        maxWidth,
        margin: "0",
      }}
      className={autoPlay ? "embedded_video_no_controls" : ""}
    >
      <MuxPlayer
        playbackId={playbackId}
        style={{
          width: "100%",
          aspectRatio: aspectRatio,
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
        }}
        loop={loop}
        poster={posterUrl}
        autoPlay={autoPlay}
        muted={muted}
        accentColor={"#f50"}
        metadata={{
          videoTitle: originalFilename,
        }}
      />
    </div>
  );
}
