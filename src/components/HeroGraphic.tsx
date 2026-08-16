export default function HeroGraphic() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 400"
      className="pointer-events-none absolute -right-16 top-6 hidden h-[360px] w-[360px] lg:block xl:-right-6 xl:h-[420px] xl:w-[420px]"
    >
      <g stroke="var(--color-border-strong)" strokeWidth="1" fill="none">
        <rect x="40" y="40" width="320" height="320" rx="28" opacity="0.5" />
        <rect
          x="90"
          y="70"
          width="230"
          height="230"
          rx="20"
          opacity="0.7"
          transform="rotate(8 205 185)"
        />
      </g>
      <rect
        x="150"
        y="130"
        width="140"
        height="140"
        rx="16"
        stroke="var(--color-accent)"
        strokeOpacity="0.55"
        strokeWidth="1.5"
        fill="none"
        transform="rotate(-6 220 200)"
      />
      <circle cx="360" cy="40" r="3" fill="var(--color-accent)" opacity="0.7" />
      <circle cx="40" cy="360" r="3" fill="var(--color-accent)" opacity="0.4" />
      <circle cx="320" cy="300" r="2.5" fill="var(--color-ink-faint)" opacity="0.6" />
    </svg>
  );
}
