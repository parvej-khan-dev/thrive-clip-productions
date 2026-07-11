export default function EmptyState({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "48px 24px",
        borderRadius: 18,
        border: "1px dashed rgba(244,239,231,.16)",
        background: "rgba(244,239,231,.03)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 28,
          color: "#F4EFE7",
          marginBottom: 10,
        }}
      >
        {title}
      </div>
      <p
        style={{
          margin: 0,
          color: "rgba(244,239,231,.55)",
          fontSize: 15,
          lineHeight: 1.6,
          maxWidth: "46ch",
          marginInline: "auto",
        }}
      >
        {message}
      </p>
    </div>
  );
}
