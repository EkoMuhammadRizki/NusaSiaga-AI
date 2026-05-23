export function MapLegend({ compact }: { compact?: boolean }) {
  const items = [
    { color: "#ef4444", label: "Kritis / Tinggi" },
    { color: "#eab308", label: "Sedang" },
    { color: "#10b981", label: "Rendah" },
  ];

  return (
    <g transform={compact ? "translate(8, 68)" : "translate(10, 72)"}>
      <rect
        x={0}
        y={0}
        width={compact ? 100 : 108}
        height={compact ? 10 : 11}
        rx={2}
        fill="rgba(11, 31, 58, 0.85)"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="0.3"
      />
      {items.map((item, i) => (
        <g key={item.label} transform={`translate(${6 + i * (compact ? 32 : 34)}, 3.5)`}>
          <circle cx={2} cy={2} r={1.8} fill={item.color} />
          <text x={6} y={3} fill="rgba(255,255,255,0.65)" fontSize="2.2" fontWeight="500">
            {item.label}
          </text>
        </g>
      ))}
    </g>
  );
}
