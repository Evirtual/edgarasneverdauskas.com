import Container from "./Container";
import { site } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] py-10">
      <Container className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-[var(--color-ink-faint)]">
          &copy; {year} {site.name}. Built with Next.js.
        </p>
        <div className="flex gap-6 text-sm text-[var(--color-ink-muted)]">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-ink)]"
          >
            GitHub
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-ink)]"
          >
            LinkedIn
          </a>
          <a href={`mailto:${site.email}`} className="hover:text-[var(--color-ink)]">
            Email
          </a>
        </div>
      </Container>
    </footer>
  );
}
