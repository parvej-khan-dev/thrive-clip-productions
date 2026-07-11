"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

const EASE = "cubic-bezier(.22,1,.36,1)";

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, visible };
}

export function revealStyle(visible: boolean, delay = 0, distance = 26): CSSProperties {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "none" : `translateY(${distance}px)`,
    transition: `opacity 1s ${EASE} ${delay}ms, transform 1s ${EASE} ${delay}ms`,
  };
}

export function Reveal({
  as: Tag = "div",
  delay = 0,
  distance = 26,
  style,
  className,
  children,
}: {
  as?: keyof React.JSX.IntrinsicElements;
  delay?: number;
  distance?: number;
  style?: CSSProperties;
  className?: string;
  children: ReactNode;
}) {
  const { ref, visible } = useReveal<HTMLElement>();
  const Comp = Tag as React.ElementType;
  return (
    <Comp ref={ref} className={className} style={{ ...revealStyle(visible, delay, distance), ...style }}>
      {children}
    </Comp>
  );
}
