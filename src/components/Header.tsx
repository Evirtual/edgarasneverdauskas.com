import Link from "next/link";
import Container from "./Container";
import LogoMark from "./LogoMark";
import ThemeToggle from "./ThemeToggle";
import { site } from "@/lib/content";

const navLinks = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-bg)]/85 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          aria-label={`${site.name} — home`}
          className="text-[var(--color-ink)] transition-opacity hover:opacity-80"
        >
          <LogoMark className="h-5 w-auto" />
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-ink)]"
              >
                {link.label}
              </a>
            ))}
            <a
              href={site.cvPath}
              className="rounded-full border border-[var(--color-border-strong)] px-4 py-1.5 text-sm text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              Résumé
            </a>
          </nav>
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}
