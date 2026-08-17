import Section from "./Section";
import { site } from "@/lib/content";

export default function About() {
  return (
    <Section id="about" index="06" eyebrow="About" title="A bit about me">
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
          These days I split my time between building my own products and
          advising other teams — usually on product direction, frontend
          architecture, or working out what is actually worth building next.
        </p>
        <p>
          Open to senior local and remote opportunities, and to advisory work.
        </p>
      </div>
    </Section>
  );
}
