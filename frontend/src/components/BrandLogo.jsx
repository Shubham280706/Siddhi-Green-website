import React from 'react';

export const BrandLogo = ({ className = '', compact = false }) => {
  const wordmarkText = compact ? 'SIDDHI' : 'SIDDHI GREEN';

  return (
    <svg
      viewBox="0 0 220 240"
      className={className}
      role="img"
      aria-label="Siddhi Green Excellence logo"
    >
      <defs>
        <linearGradient id="brandFrame" x1="20" y1="18" x2="200" y2="170" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7e2f8e" />
          <stop offset="1" stopColor="#53206f" />
        </linearGradient>
      </defs>

      <path
        d="M110 14 192 72 166 170H54L28 72Z"
        fill="none"
        stroke="url(#brandFrame)"
        strokeWidth="10"
        strokeLinejoin="round"
      />
      <path
        d="M110 32 176 78 156 156H64L44 78Z"
        fill="#ffffff"
        stroke="#7e2f8e"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <g transform="translate(110 96)">
        <circle r="28" fill="#ffffff" stroke="#7e2f8e" strokeWidth="6" />
        <path
          d="M0-56 14-22 48-34 30-2 58 22 22 24 28 58 0 34-28 58-22 24-58 22-30-2-48-34-14-22Z"
          fill="#7e2f8e"
        />
        <circle r="26" fill="#ffffff" />
      </g>
      <rect x="48" y="172" width="124" height="6" rx="3" fill="#7e2f8e" />
      <text
        x="110"
        y="210"
        textAnchor="middle"
        fill="#4f4f4f"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="700"
        fontSize="24"
        letterSpacing="4"
      >
        {wordmarkText}
      </text>
    </svg>
  );
};
