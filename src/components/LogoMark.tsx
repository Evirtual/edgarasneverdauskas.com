export default function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 38 24"
      className={className}
      aria-hidden="true"
    >
      <text
        x="0"
        y="19.3"
        fontFamily="var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif"
        fontWeight={700}
        fontSize="21"
        fill="currentColor"
      >
        EN
      </text>
      <rect x="30.1" y="8.7" width="6.5" height="6.5" rx="1.2" fill="var(--color-accent)" />
    </svg>
  );
}
