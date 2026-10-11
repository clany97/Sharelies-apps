/** The art deco neon tower that crowns the marquee, after the Atlas 9 reference. */
export function Tower() {
  const bulbs = Array.from({ length: 6 }, (_, i) => 12 + i * 9);
  return (
    <svg className="tower" viewBox="0 0 120 120" aria-hidden="true">
      <g className="tower-neon">
        <path d="M44 120V16a16 16 0 0 1 32 0v104" />
        <path d="M22 120V74a22 22 0 0 1 22-22M98 120V74a22 22 0 0 0-22-22" />
        <path d="M54 118V20M60 118V14M66 118V20" />
        <path d="M33 96a6 6 0 1 1 6-6 3.5 3.5 0 1 1-3.5-3.5M87 96a6 6 0 1 0-6-6 3.5 3.5 0 1 0 3.5-3.5" />
        <path d="M30 112q4-8 8 0M82 112q4-8 8 0" />
      </g>
      <g className="tower-bulbs">
        {bulbs.map((y) => (
          <g key={y}>
            <circle cx="44" cy={y + 8} r="1.9" />
            <circle cx="76" cy={y + 8} r="1.9" />
          </g>
        ))}
      </g>
    </svg>
  );
}
