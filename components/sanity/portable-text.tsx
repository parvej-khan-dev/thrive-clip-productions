import {
  PortableText as PortableTextRenderer,
  type PortableTextComponents,
  type PortableTextBlock,
} from "@portabletext/react";
import { urlForImage } from "@/lib/sanity";
import type { PortableTextValue } from "@/lib/sanity-types";

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(32px,4vw,48px)",
          lineHeight: 1.1,
          margin: "1.4em 0 0.5em",
        }}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(26px,3vw,36px)",
          lineHeight: 1.15,
          margin: "1.3em 0 0.45em",
        }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(22px,2.4vw,28px)",
          lineHeight: 1.2,
          margin: "1.2em 0 0.4em",
        }}
      >
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p
        style={{
          margin: "0 0 1.1em",
          lineHeight: 1.75,
          color: "rgba(244,239,231,.72)",
          fontSize: "clamp(15px,1.2vw,17px)",
        }}
      >
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote
        style={{
          margin: "1.4em 0",
          padding: "12px 0 12px 20px",
          borderLeft: "3px solid #E0A65A",
          color: "rgba(244,239,231,.8)",
          fontStyle: "italic",
        }}
      >
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#E0A65A", textDecoration: "underline" }}
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => <strong style={{ fontWeight: 600 }}>{children}</strong>,
    em: ({ children }) => <em style={{ fontStyle: "italic" }}>{children}</em>,
  },
  list: {
    bullet: ({ children }) => (
      <ul style={{ margin: "0 0 1.2em", paddingLeft: 22, color: "rgba(244,239,231,.72)" }}>
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol style={{ margin: "0 0 1.2em", paddingLeft: 22, color: "rgba(244,239,231,.72)" }}>
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li style={{ marginBottom: 8 }}>{children}</li>,
    number: ({ children }) => <li style={{ marginBottom: 8 }}>{children}</li>,
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) {
        return null;
      }
      const src = urlForImage(value).width(1200).auto("format").url();
      return (
        <figure style={{ margin: "1.6em 0" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={typeof value.alt === "string" ? value.alt : ""}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: 14,
              border: "1px solid rgba(244,239,231,.1)",
            }}
          />
        </figure>
      );
    },
  },
};

export default function PortableText({ value }: { value: PortableTextValue }) {
  if (!value || value.length === 0) {
    return null;
  }

  return (
    <PortableTextRenderer
      value={value as PortableTextBlock[]}
      components={components}
    />
  );
}
