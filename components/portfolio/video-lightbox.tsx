"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { PlayIcon } from "@/components/icons";

// Play-button trigger that opens a fullscreen video lightbox. Rendered inside
// the portfolio card's <Link>, so the click must be stopped from navigating.
// The modal is portaled to <body> because the card uses `overflow: hidden`
// and sits inside transformed reveal wrappers.
export default function VideoLightbox({
  videoUrl,
  title,
}: {
  videoUrl: string;
  title: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  const handleOpen = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setOpen(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        aria-label={`Play ${title}`}
        data-cursor="lg"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: "rgba(10,9,8,.28)",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(244,239,231,.22)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "none",
          padding: 0,
          opacity: 0.78,
          transition: "opacity .25s ease, transform .25s ease",
        }}
      >
        <PlayIcon size={16} />
      </button>

      {mounted && open
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={title}
              onClick={close}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 1000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "clamp(16px,4vw,48px)",
                background: "rgba(10,9,8,.9)",
                backdropFilter: "blur(10px)",
                animation: "tc-lightbox-in .2s ease",
              }}
            >
              <button
                type="button"
                onClick={close}
                aria-label="Close video"
                data-cursor="lg"
                style={{
                  position: "absolute",
                  top: "clamp(16px,3vw,28px)",
                  right: "clamp(16px,3vw,28px)",
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "rgba(244,239,231,.06)",
                  border: "1px solid rgba(244,239,231,.16)",
                  color: "#F4EFE7",
                  fontSize: 22,
                  lineHeight: 1,
                  cursor: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ×
              </button>

              <video
                src={videoUrl}
                controls
                autoPlay
                playsInline
                aria-label={title}
                onClick={(event) => event.stopPropagation()}
                style={{
                  maxWidth: "min(92vw, 480px)",
                  maxHeight: "88vh",
                  width: "auto",
                  height: "auto",
                  borderRadius: 16,
                  border: "1px solid rgba(244,239,231,.1)",
                  background: "#111",
                  boxShadow: "0 30px 80px rgba(0,0,0,.55)",
                }}
              >
                <track kind="captions" />
              </video>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
