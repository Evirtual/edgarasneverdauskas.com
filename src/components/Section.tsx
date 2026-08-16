import { ReactNode } from "react";
import Container from "./Container";

export default function Section({
  id,
  index,
  eyebrow,
  title,
  description,
  children,
  className = "",
}: {
  id?: string;
  index?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 py-14 md:py-20 ${className}`}>
      <Container>
        {(eyebrow || title || description) && (
          <div className="mb-10 md:mb-12 flex gap-6">
            {index && (
              <span
                aria-hidden="true"
                className="hidden sm:block font-mono text-sm text-[var(--color-ink-faint)] pt-1"
              >
                {index}
              </span>
            )}
            <div className="max-w-2xl">
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
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
