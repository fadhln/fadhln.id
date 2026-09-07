type OgCardProps = {
  title: string;
  subtitle?: string;
};

// Rendered by next/og (Satori): flexbox only, no CSS variables, explicit colors.
function OgCard({ title, subtitle }: OgCardProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        backgroundColor: "#0a0a0a",
        color: "#fafafa",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 20, height: 20, backgroundColor: "#2450ff" }} />
        <div style={{ fontSize: 24, letterSpacing: 2 }}>fadhln.id</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            fontSize: title.length > 60 ? 56 : 72,
            lineHeight: 1.15,
            maxWidth: 1000,
            fontWeight: 600,
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div style={{ fontSize: 32, color: "#a3a3a3", maxWidth: 1000 }}>{subtitle}</div>
        )}
      </div>
    </div>
  );
}

export default OgCard;
