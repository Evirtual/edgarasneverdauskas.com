export default function HeroGraphic() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 flex items-start justify-center overflow-hidden"
    >
      <svg
        viewBox="0 0 400 400"
        className="mt-4 h-[320px] w-[320px] sm:mt-8 sm:h-[420px] sm:w-[420px] lg:mt-2 lg:h-[520px] lg:w-[520px]"
      >
        <g className="animate-float-a">
          <rect
            x="60"
            y="60"
            width="280"
            height="280"
            rx="28"
            stroke="var(--color-ink-faint)"
            strokeOpacity="0.55"
            strokeWidth="1.5"
            fill="none"
          />
        </g>

        <g className="animate-float-b">
          <rect
            x="115"
            y="105"
            width="190"
            height="190"
            rx="20"
            stroke="var(--color-accent)"
            strokeOpacity="0.55"
            strokeWidth="2"
            fill="none"
          />
          <line
            x1="115"
            y1="105"
            x2="48"
            y2="48"
            stroke="var(--color-ink-faint)"
            strokeOpacity="0.5"
            strokeWidth="1.5"
          />
          <line
            x1="305"
            y1="295"
            x2="362"
            y2="352"
            stroke="var(--color-ink-faint)"
            strokeOpacity="0.5"
            strokeWidth="1.5"
          />
          <circle cx="48" cy="48" r="5" fill="var(--color-accent)" opacity="0.85" />
          <circle cx="362" cy="352" r="4.5" fill="var(--color-accent)" opacity="0.6" />
          <circle cx="305" cy="105" r="4" fill="var(--color-ink-faint)" opacity="0.7" />
        </g>
      </svg>
    </div>
  );
}
