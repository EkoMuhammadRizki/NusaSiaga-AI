/** More accurate Indonesia archipelago — fits 120x80 viewBox */
export function IndonesiaIslands() {
  return (
    <g className="islands">
      <defs>
        <filter id="islandGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <linearGradient id="islandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(16, 185, 129, 0.15)" />
          <stop offset="100%" stopColor="rgba(14, 58, 95, 0.2)" />
        </linearGradient>
      </defs>

      {/* Sumatra */}
      <path
        d="M5 25 L15 15 L35 30 L25 45 L5 25"
        fill="url(#islandGradient)"
        stroke="rgba(16, 185, 129, 0.5)"
        strokeWidth="0.5"
        filter="url(#islandGlow)"
      />
      {/* Kalimantan */}
      <path
        d="M40 10 L60 10 L65 25 L55 35 L40 30 L40 10"
        fill="url(#islandGradient)"
        stroke="rgba(16, 185, 129, 0.5)"
        strokeWidth="0.5"
        filter="url(#islandGlow)"
      />
      {/* Java */}
      <path
        d="M30 50 L75 50 L75 55 L30 55 L30 50"
        fill="url(#islandGradient)"
        stroke="rgba(16, 185, 129, 0.6)"
        strokeWidth="0.5"
        filter="url(#islandGlow)"
      />
      {/* Sulawesi */}
      <path
        d="M75 15 L85 15 L85 25 L95 25 L95 30 L85 30 L85 45 L80 45 L80 30 L75 30 L75 15"
        fill="url(#islandGradient)"
        stroke="rgba(16, 185, 129, 0.5)"
        strokeWidth="0.5"
        filter="url(#islandGlow)"
      />
      {/* Papua */}
      <path
        d="M100 25 L115 25 L120 40 L115 55 L100 50 L105 40 L100 25"
        fill="url(#islandGradient)"
        stroke="rgba(16, 185, 129, 0.5)"
        strokeWidth="0.5"
        filter="url(#islandGlow)"
      />
      {/* Bali & Nusa Tenggara */}
      <path
        d="M78 52 L105 52 L105 55 L78 55 Z"
        fill="url(#islandGradient)"
        stroke="rgba(16, 185, 129, 0.4)"
        strokeWidth="0.4"
        filter="url(#islandGlow)"
      />
      {/* Grid lines subtle */}
      <g stroke="rgba(255,255,255,0.04)" strokeWidth="0.2">
        {[20, 40, 60, 80, 100].map((x) => (
          <line key={`v${x}`} x1={x} y1={5} x2={x} y2={75} />
        ))}
        {[20, 40, 60].map((y) => (
          <line key={`h${y}`} x1={5} y1={y} x2={115} y2={y} />
        ))}
      </g>
    </g>
  );
}
