import Section from "./Section";
import { site } from "@/lib/content";

export default function About() {
  return (
    <Section id="about" eyebrow="About" title="A bit about me">
      <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-[var(--color-ink-muted)]">
        <p>
          I&apos;m a senior product engineer with {site.yearsExperience} years
          in software development, based in {site.location}. My background is
          in frontend and product engineering, with real depth in fintech,
          DeFi and blockchain, and more recently AI-enabled software and
          consumer products.
        </p>
        <p>
          I like turning ideas into working products — the whole path from
          data and architecture through UX, testing and deployment. I&apos;m
          hands-on by preference, not by necessity: I&apos;d rather be
          building than managing the building.
        </p>
        <p>
          Open to senior local and remote opportunities.
        </p>
      </div>
    </Section>
  );
}
