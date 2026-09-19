import React from 'react';

export const BackgroundPattern: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden -z-10 select-none print:hidden transition-colors duration-300"
      aria-hidden="true"
    >
      {/* 1. Warm ambient gradient meshes / soft glow spots (Light: Warm Pastel, Dark: Soft Charcoal/Amber Glow) */}
      <div className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-[#fde2cd]/45 dark:bg-[#e07a38]/10 blur-[100px]" />
      <div className="absolute top-1/4 -right-28 w-[500px] h-[500px] rounded-full bg-[#fef3c7]/35 dark:bg-[#f59e0b]/8 blur-[110px]" />
      <div className="absolute top-2/3 left-1/4 w-[600px] h-[600px] rounded-full bg-[#fde8d7]/30 dark:bg-[#d97706]/8 blur-[120px]" />
      <div className="absolute -bottom-32 right-1/4 w-[550px] h-[550px] rounded-full bg-[#fde2cd]/35 dark:bg-[#ea580c]/8 blur-[100px]" />

      {/* 2. SVG Watermark Floating Icons & Scattered Pattern (Subtle Opacity, Organic Distribution) */}
      <svg 
        className="w-full h-full text-[#b45309] dark:text-[#f3a766] opacity-[0.04] dark:opacity-[0.03] transition-colors duration-300"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Paw Print Pattern */}
          <pattern id="rescue-paw-grid" x="0" y="0" width="240" height="240" patternUnits="userSpaceOnUse">
            {/* Paw 1 */}
            <g transform="translate(30, 40) rotate(15) scale(0.85)">
              <ellipse cx="12" cy="18" rx="8" ry="6.5" fill="currentColor" />
              <circle cx="4" cy="7" r="3" fill="currentColor" />
              <circle cx="10" cy="4" r="3" fill="currentColor" />
              <circle cx="16" cy="4.5" r="3" fill="currentColor" />
              <circle cx="21" cy="8" r="2.8" fill="currentColor" />
            </g>

            {/* Heart 1 */}
            <g transform="translate(160, 30) rotate(-10) scale(0.9)">
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>

            {/* Cat Silhouette 1 */}
            <g transform="translate(190, 150) rotate(8) scale(0.8)">
              <path
                d="M12 2c-3.5 0-6.5 2.5-6.5 6 0 1.2.4 2.3 1.1 3.2L4.5 17c-.3.7.2 1.5 1 1.5h13c.8 0 1.3-.8 1-1.5l-2.1-5.8c.7-.9 1.1-2 1.1-3.2 0-3.5-3-6-6.5-6z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>

            {/* Dog Silhouette 1 */}
            <g transform="translate(60, 160) rotate(-12) scale(0.85)">
              <path
                d="M10 5.122A7 7 0 0 0 3.337 11.5c-.067.8.318 1.57.994 2.01l.865.564a4 4 0 0 0 2.204.676h1.2a1 1 0 0 1 1 1v2a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-1.5a1.5 1.5 0 0 1 1.5-1.5h1.2a4 4 0 0 0 2.204-.676l.865-.564c.676-.44 1.061-1.21.994-2.01A7 7 0 0 0 14 5.122V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v2.122z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>

            {/* Medical / First Aid Cross 1 */}
            <g transform="translate(120, 100) scale(0.8)">
              <rect x="8" y="2" width="8" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <rect x="2" y="8" width="20" height="8" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </g>
          </pattern>

          {/* Secondary Animal & Shelter Variety Pattern */}
          <pattern id="rescue-variety-grid" x="120" y="120" width="360" height="360" patternUnits="userSpaceOnUse">
            {/* Shelter / House */}
            <g transform="translate(80, 70) rotate(-5) scale(0.9)">
              <path
                d="M3 10.5L12 3l9 7.5V20a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 20v-9.5z M9 21v-6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>

            {/* Rabbit */}
            <g transform="translate(260, 60) rotate(15) scale(0.85)">
              <path
                d="M13 16a5 5 0 1 0-7-4.6V7a2 2 0 1 1 4 0v1 M13 8a2 2 0 1 1 4 0v4.4A5 5 0 0 0 13 16z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>

            {/* Bird */}
            <g transform="translate(290, 240) rotate(-15) scale(0.85)">
              <path
                d="M16 7a4 4 0 0 1-8 0 4 4 0 0 0-4 4 6 6 0 0 0 6 6h6a6 6 0 0 0 6-6 4 4 0 0 0-4-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>

            {/* Turtle */}
            <g transform="translate(70, 260) rotate(20) scale(0.85)">
              <path
                d="M12 7a6 6 0 0 1 6 6v2a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4v-2a6 6 0 0 1 6-6z M12 3a2 2 0 0 1 2 2v2h-4V5a2 2 0 0 1 2-2z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>

            {/* Stethoscope / Medical Heart */}
            <g transform="translate(190, 180) rotate(-8) scale(0.85)">
              <path
                d="M4.5 3v5a4.5 4.5 0 0 0 9 0V3 M9 12.5v3.5a3 3 0 0 0 6 0V15"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>

            {/* Paw 2 */}
            <g transform="translate(200, 310) rotate(-25) scale(0.75)">
              <ellipse cx="12" cy="18" rx="8" ry="6.5" fill="currentColor" />
              <circle cx="4" cy="7" r="3" fill="currentColor" />
              <circle cx="10" cy="4" r="3" fill="currentColor" />
              <circle cx="16" cy="4.5" r="3" fill="currentColor" />
              <circle cx="21" cy="8" r="2.8" fill="currentColor" />
            </g>
          </pattern>
        </defs>

        {/* Primary repeating pattern layer */}
        <rect width="100%" height="100%" fill="url(#rescue-paw-grid)" />
        {/* Secondary scattered variety layer */}
        <rect width="100%" height="100%" fill="url(#rescue-variety-grid)" />
      </svg>
    </div>
  );
};
