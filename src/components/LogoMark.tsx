export default function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 33 24"
      className={className}
      aria-hidden="true"
    >
      <text
        x="0"
        y="19"
        fontFamily="var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif"
        fontWeight={700}
        fontSize="21"
        letterSpacing="-0.5"
        fill="currentColor"
      >
        EN
      </text>
      <circle cx="30" cy="19.5" r="2.6" fill="var(--color-accent)" />
    </svg>
  );
}
