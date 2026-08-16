"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Container from "./Container";
import { site } from "@/lib/content";

const navLinks = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-bg)]/85 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-tight text-[var(--color-ink)]"
          onClick={() => setOpen(false)}
        >
          EN<span className="text-[var(--color-accent)]">.</span>
        </Link>

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

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border-strong)] text-[var(--color-ink)]"
        >
          <span className="sr-only">Toggle menu</span>
          {open ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M1 4H15M1 8H15M1 12H15" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          )}
        </button>
      </Container>

      {open && (
        <div className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-bg)]">
          <Container className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base text-[var(--color-ink-muted)] hover:bg-[var(--color-bg-raised)] hover:text-[var(--color-ink)]"
              >
                {link.label}
              </a>
            ))}
            <a
              href={site.cvPath}
              onClick={() => setOpen(false)}
              className="mt-2 rounded-lg border border-[var(--color-border-strong)] px-3 py-3 text-center text-base text-[var(--color-ink)]"
            >
              Download Résumé
            </a>
          </Container>
        </div>
      )}
    </header>
  );
}
