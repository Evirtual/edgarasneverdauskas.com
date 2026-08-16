import { ReactNode } from "react";
import Container from "./Container";

export default function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 py-20 md:py-28 ${className}`}>
      <Container>
        {(eyebrow || title || description) && (
          <div className="mb-12 md:mb-16 max-w-2xl">
            {eyebrow && (
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-balance text-3xl md:text-4xl font-medium tracking-tight text-[var(--color-ink)]">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-balance text-base md:text-lg text-[var(--color-ink-muted)]">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
