import ResponsiveVideo from "./ResponsiveVideo";

export default function VideoBlock({ block }: { block: any }) {
  const { video, settings } = block;
  const { autoPlay, muted, loop, title } = settings || {};
  if (!video?.playbackId) return null;

  return (
    <div className="pt-6 px-2">
      {title && (
        <div className="flex w-full justify-center pb-2">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 underline decoration-2 decoration-[#f50] underline-offset-4">
              {title}
            </h2>
          </div>
        </div>
      )}
      <ResponsiveVideo
        video={video || {}}
        autoPlay={muted && autoPlay ? "muted" : false}
        muted={muted}
        loop={loop}
      />
    </div>
  );
}
