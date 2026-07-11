"use client";

import { useEffect } from "react";

function sampleCorner(x: number, y: number) {
  const els = document.elementsFromPoint(x, y).slice(0, 5).map((el) => {
    const s = getComputedStyle(el);
    return {
      tag: el.tagName.toLowerCase(),
      id: el.id || null,
      cls: typeof el.className === "string" ? el.className.slice(0, 40) : null,
      bg: s.backgroundColor,
      opacity: s.opacity,
      filter: s.filter,
      backdrop: s.backdropFilter,
      mix: s.mixBlendMode,
      pos: s.position,
    };
  });
  return els;
}

export default function ResizeDebugProbe() {
  useEffect(() => {
    let frames = 0;
    const onResize = () => {
      frames += 1;
      if (frames % 3 !== 0) return;

      const html = document.documentElement;
      const body = document.body;
      const page = document.querySelector("[data-page-root]") as HTMLElement | null;
      const canvas = document.querySelector("canvas");
      const htmlRect = html.getBoundingClientRect();
      const bodyRect = body.getBoundingClientRect();
      const pageRect = page?.getBoundingClientRect();
      const htmlStyle = getComputedStyle(html);
      const bodyStyle = getComputedStyle(body);
      const pageStyle = page ? getComputedStyle(page) : null;
      const iw = window.innerWidth;
      const ih = window.innerHeight;

      // #region agent log
      fetch("http://127.0.0.1:7717/ingest/d94b2140-3ee8-4a9e-b93f-176ed3646a97", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Debug-Session-Id": "d48b32",
        },
        body: JSON.stringify({
          sessionId: "d48b32",
          runId: "post-fix",
          hypothesisId: "C",
          location: "resize-debug-probe.tsx:onResize",
          message: "viewport vs root coverage on resize",
          data: {
            iw,
            ih,
            htmlBg: htmlStyle.backgroundColor,
            bodyBg: bodyStyle.backgroundColor,
            pageBg: pageStyle?.backgroundColor ?? null,
            bodyOpacity: bodyStyle.opacity,
            htmlW: htmlRect.width,
            htmlH: htmlRect.height,
            bodyW: bodyRect.width,
            bodyH: bodyRect.height,
            pageW: pageRect?.width ?? null,
            pageH: pageRect?.height ?? null,
            gapRight: Math.max(0, iw - htmlRect.width),
            gapBottom: Math.max(0, ih - htmlRect.height),
            bodyGapRight: Math.max(0, iw - bodyRect.width),
            bodyGapBottom: Math.max(0, ih - bodyRect.height),
            canvasClient: canvas
              ? { w: canvas.clientWidth, h: canvas.clientHeight, bw: canvas.width, bh: canvas.height }
              : null,
            corners: {
              tl: sampleCorner(1, 1),
              tr: sampleCorner(iw - 2, 1),
              bl: sampleCorner(1, ih - 2),
              br: sampleCorner(iw - 2, ih - 2),
            },
          },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion
    };

    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return null;
}
