export default function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 34 24"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      {/* E */}
      <rect x="3" y="3" width="3" height="18" fill="currentColor" />
      <rect x="3" y="3" width="9" height="3" fill="currentColor" />
      <rect x="3" y="10.5" width="6" height="3" fill="currentColor" />
      <rect x="3" y="18" width="9" height="3" fill="currentColor" />
      {/* N */}
      <rect x="16" y="3" width="3" height="18" fill="currentColor" />
      <rect x="25" y="3" width="3" height="18" fill="currentColor" />
      <polygon points="16,3 19,3 28,21 25,21" fill="currentColor" />
      {/* accent dot */}
      <rect x="30" y="18" width="3" height="3" rx="0.75" fill="var(--color-accent)" />
    </svg>
  );
}
