import Link from "next/link";
import Container from "@/components/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">
        404
      </p>
      <h1 className="mt-4 text-3xl font-medium text-[var(--color-ink)]">
        Page not found
      </h1>
      <p className="mt-3 text-[var(--color-ink-muted)]">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-medium text-[var(--color-bg)]"
      >
        Back to home
      </Link>
    </Container>
  );
}
