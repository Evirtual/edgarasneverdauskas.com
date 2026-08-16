"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/content";

const tabs = [
  {
    id: "work",
    label: "Work",
    href: "/#work",
    icon: (
      <path
        d="M3 7.5h14M6.5 7.5V5.8c0-.7.6-1.3 1.3-1.3h4.4c.7 0 1.3.6 1.3 1.3V7.5M4.5 7.5h11a1 1 0 0 1 1 1v6.2a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V8.5a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    ),
  },
  {
    id: "experience",
    label: "Experience",
    href: "/#experience",
    icon: (
      <>
        <circle cx="10" cy="10" r="6.75" stroke="currentColor" strokeWidth="1.4" />
        <path d="M10 6.5V10l2.5 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    id: "about",
    label: "About",
    href: "/#about",
    icon: (
      <>
        <circle cx="10" cy="7" r="2.6" stroke="currentColor" strokeWidth="1.4" />
        <path d="M4.5 16c0-2.9 2.5-5 5.5-5s5.5 2.1 5.5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: "contact",
    label: "Contact",
    href: "/#contact",
    icon: (
      <>
        <rect x="3.2" y="5" width="13.6" height="10" rx="1.6" stroke="currentColor" strokeWidth="1.4" />
        <path d="M3.7 5.9 10 10.5l6.3-4.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
];

export default function BottomNav() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const sections = tabs
      .map((t) => document.getElementById(t.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid grid-cols-5">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <a
              href={tab.href}
              className={`flex flex-col items-center gap-1 py-2.5 text-[10px] transition-colors ${
                active === tab.id
                  ? "text-[var(--color-accent)]"
                  : "text-[var(--color-ink-faint)]"
              }`}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                {tab.icon}
              </svg>
              {tab.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href={site.cvPath}
            className="flex flex-col items-center gap-1 py-2.5 text-[10px] text-[var(--color-ink-faint)] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M10 3.5v9M6.8 9.3 10 12.5l3.2-3.2M4 15.5h12"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Résumé
          </a>
        </li>
      </ul>
    </nav>
  );
}
