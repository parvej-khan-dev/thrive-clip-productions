import { getVideoAspectRatio, getVideoEmbedInfo } from "@/lib/video";

export default function VideoEmbed({
  url,
  title = "Project video",
}: {
  url: string;
  title?: string;
}) {
  const info = getVideoEmbedInfo(url);
  if (!info) {
    return null;
  }

  const aspectRatio = getVideoAspectRatio(url);
  const isVertical = aspectRatio === "9 / 16";

  const frameStyle = {
    width: isVertical ? "min(360px, 100%)" : "100%",
    marginInline: isVertical ? ("auto" as const) : undefined,
    aspectRatio,
    borderRadius: 16,
    border: "1px solid rgba(244,239,231,.1)",
    background: "#111",
    overflow: "hidden" as const,
  };

  if (info.kind === "youtube") {
    return (
      <div style={frameStyle}>
        <iframe
          src={info.src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ width: "100%", height: "100%", border: 0, display: "block" }}
        />
      </div>
    );
  }

  return (
    <div style={frameStyle}>
      <video
        src={info.src}
        controls
        playsInline
        preload="metadata"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          objectFit: "cover",
        }}
      >
        <track kind="captions" />
      </video>
    </div>
  );
}
