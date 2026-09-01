export const site = {
  name: "Edgaras Neverdauskas",
  title: "Senior Product Engineer",
  tagline:
    "I build modern software products from idea to production across web, AI, data, fintech and Web3.",
  location: "Kampot, Cambodia",
  email: "contact@edgarasneverdauskas.com",
  phone: "+855 81 680 954",
  url: "https://edgarasneverdauskas.com",
  linkedin: "https://linkedin.com/in/edgarasneverdauskas",
  github: "https://github.com/Evirtual",
  cvPath: "/Edgaras_Neverdauskas_CV.pdf",
  stack: ["React", "TypeScript", "Next.js", "AI", "Web3", "Fintech"],
  yearsExperience: "10+",
  // Signals both paths: employment and advisory work.
  availability: "Open to senior roles & advisory work",
};

// These describe the problems worth thinking through together, not the stack
// they happen to be built on. No engagement formats are promised here — the
// shape of any work is decided per conversation, not advertised up front.
export type Service = {
  title: string;
  summary: string;
  points: string[];
};

export const services: Service[] = [
  {
    title: "Product Direction",
    summary:
      "You have an idea, an MVP, or something already running, and you're not sure what should come next. Product thinking grounded in real experience building and shipping software.",
    points: [
      "What the product actually solves, and for whom",
      "What belongs in the first version, and what can wait",
      "Features and complexity you don't need",
      "Whether the current direction still makes sense",
    ],
  },
  {
    title: "UI/UX & Product Review",
    summary:
      "We go through something together — a site, an app, a user flow, a Figma file. I look at it as a user would, and from the perspective of someone who understands what it takes to build it.",
    points: [
      "User flows and steps that could be removed",
      "Where the interface is likely to lose people",
      "Information hierarchy and simplification",
      "How it holds up on a phone",
    ],
  },
  {
    title: "Technical Approach",
    summary:
      "You know roughly what you want to build and want another perspective before committing real time or money. Whether I end up building any of it is a separate question.",
    points: [
      "Feasibility, and how hard this really is",
      "Implementation approach and practical architecture",
      "Build it, or use something that already exists",
      "Where something is being over-engineered",
    ],
  },
  {
    title: "AI & Product Opportunities",
    summary:
      "Where AI genuinely improves what you're building or how you work — and, just as often, where it only adds cost and risk.",
    points: [
      "Practical AI features worth building",
      "Where AI is unnecessary",
      "Ideas that are far cheaper to build than they used to be",
      "Judging an AI idea on product and technical grounds",
    ],
  },
];

export type ProjectLink = {
  label: string;
  url: string;
};

export type Project = {
  slug: string;
  name: string;
  logo?: string;
  role: string;
  /** Year the work began. Rendered as "Since <year>" — deliberately open-ended,
      because these products stay alive and an end year would rot each January. */
  started: string;
  summary: string;
  problem: string;
  ownership: string[];
  challenges: string[];
  decisions: string[];
  tech: string[];
  links: ProjectLink[];
  note?: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "ampuno",
    name: "Ampuno",
    logo: "/logos/ampuno.png",
    role: "Founder & Product Engineer",
    started: "2026",
    summary:
      "An electric-vehicle catalogue and comparison platform: structured EV data, search, filtering, and side-by-side model comparison built for clarity at scale.",
    problem:
      "Buyers researching EVs are stuck with inconsistent spec sheets scattered across manufacturer sites. Ampuno normalizes hundreds of models into a single, comparable, searchable catalogue.",
    ownership: [
      "Full product and engineering ownership, end to end",
      "Data ingestion, normalization and validation pipeline for hundreds of vehicle models and 1,000+ variants",
      "Application architecture, search/filtering, model and trim pages, and comparison UX",
      "Test strategy, SEO/canonical metadata and deployment workflow",
    ],
    challenges: [
      "Normalizing inconsistent, multi-source EV specification data into a single reliable schema",
      "Keeping search and filtering fast and accurate across a large, frequently-updated dataset",
      "Structuring comparison UX so dense technical data stays scannable",
    ],
    decisions: [
      "Next.js App Router with static generation for model and trim pages, prioritizing SEO and load speed",
      "A validation layer between raw source data and the rendered catalogue to catch bad or incomplete records before they ship",
      "Vitest for data/logic correctness and Playwright for end-to-end verification of search, filtering and comparison flows",
    ],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Vitest",
      "Playwright",
      "Tailwind CSS",
      "zod",
      "SEO / canonical metadata",
      "Analytics",
    ],
    links: [{ label: "Live product", url: "https://ampuno.com" }],
    featured: true,
  },
  {
    slug: "self-aware-writing",
    name: "Self-Aware Writing",
    logo: "/logos/selfawarewriting.svg",
    role: "Author & Product Engineer",
    started: "2026",
    summary:
      "A living book that notices you while you read it — it knows where you are, remembers where you stopped, and won't build if the prose contradicts itself.",
    problem:
      "The reader's own attention is the subject, so the interface has to follow progress and memory without accounts or tracking — and the prose makes claims about itself that a later edit can quietly falsify.",
    ownership: [
      "Concept, writing and product design — the book and the software are one artifact",
      "Astro/TypeScript architecture where a chapter is one Markdown file everything else derives from",
      "Custom remark/rehype plugins for stanza breaks and in-chapter page splitting",
      "Reader behaviour: two reading modes, theme, progress, resume, offline PWA",
      "A checker for the claims the book makes about itself, plus 75 Playwright tests run across desktop, mobile and Safari",
    ],
    challenges: [
      "Chapters quote each other, so editing one file can falsify a sentence in another",
      "The text promises a moment with no words on screen, which the page break has to deliver",
      "Splitting pages at the AST level so the rail, pager and progress agree in both modes",
    ],
    decisions: [
      "Astro's file-format build, so the rebuild kept the URLs the hand-written site had published",
      "Continuous reading by default and paged on request, with every page in the HTML either way",
      "Self-checks run in CI, so a contradiction between chapters fails the build",
      "Reader state in localStorage only — no analytics, no accounts, nothing leaving the browser",
    ],
    tech: [
      "Astro",
      "TypeScript",
      "Playwright",
      "remark / rehype",
      "PWA / Service Worker",
      "Markdown content",
      "GitHub Actions",
      "SEO / sitemap",
    ],
    links: [
      { label: "Live product", url: "https://selfawarewriting.com" },
    ],
    note: "Deliberately unfinished — chapters are added as they are written, and the next one sits listed and locked in the sidebar before it exists.",
    featured: true,
  },
  {
    slug: "atunicorn",
    name: "@unicorn",
    logo: "/logos/atunicorn.png",
    role: "Founder & Product Engineer",
    started: "2022",
    summary:
      "A long-running social and self-expression product, in continuous iteration since 2022 — product direction, authentication, profiles, posts and media, built and rebuilt as the platform matured.",
    problem:
      "Building a consumer social product that survives multiple technology and design iterations without losing continuity of product direction or user data.",
    ownership: [
      "Product direction and UX across multiple platform iterations",
      "Authentication, user profiles, posts and media upload flows",
      "Responsive application architecture across web and native-web surfaces",
      "Ongoing iteration and modernization of the technology stack",
    ],
    challenges: [
      "Maintaining product continuity through several rounds of architecture and stack changes",
      "Building responsive interfaces that work consistently across web and React Native Web surfaces",
      "Iterating on a live consumer product without a dedicated backend team",
    ],
    decisions: [
      "Firebase as a managed backend to keep infrastructure overhead low for a founder-run product",
      "React Native Web to share application logic between web and native-leaning surfaces",
      "Progressive modernization of the stack (Next.js, styled-components) rather than a disruptive rewrite",
      "A Cloudflare Worker fronting Cloudinary for media, keeping image handling off the Firebase bill",
    ],
    tech: [
      "Next.js",
      "React",
      "Firebase",
      "React Native Web",
      "styled-components",
      "Cloudflare Workers",
      "Cloudinary",
    ],
    links: [{ label: "Live product", url: "https://atunicorn.io" }],
    featured: true,
  },
  {
    slug: "bitcoin-analytics",
    name: "Bitcoin Analytics",
    logo: "/logos/bitcoin-analytics.svg",
    role: "Independent Product Engineer",
    started: "2025",
    summary:
      "A Bitcoin market and portfolio analytics dashboard: price, returns, volatility, drawdowns, moving averages and market mood, alongside multichain wrapped-Bitcoin wallet balances across Ethereum, Base and BSC.",
    problem:
      "Reading Bitcoin exposure properly means holding two things at once: what the market is doing, and what you actually hold. Public market APIs rate-limit and go down, and wrapped-Bitcoin holdings sit behind a different token contract on every chain. This pulls both into one view that degrades instead of breaking.",
    ownership: [
      "Product direction, architecture and implementation decisions",
      "Market data integration with Coinbase/Kraken fallback, per-source backoff and a short-lived local price cache",
      "An analytics layer: returns, volatility, drawdowns, moving averages, price bands, a returns heatmap and volume, over 1D/1W/1M ranges",
      "Fear & Greed market mood, plus portfolio holdings, risk and cost-basis tracking held entirely in the browser",
      "Multichain wallet connectivity and wrapped-Bitcoin balance aggregation (Ethereum WBTC, Base WBTC, BSC BTCB)",
      "Code review, debugging, integration testing and final quality — using AI tools as an implementation accelerator throughout",
    ],
    challenges: [
      "Staying inside public API rate limits without the dashboard going blank — a failing source is backed off rather than retried",
      "Keeping a dozen chart cards readable on a phone without cutting the data they exist to show",
      "Aggregating wrapped-Bitcoin balances consistently across chains with different token contracts and decimals",
      "Structuring an AI-assisted build so generated code still met production standards after review",
    ],
    decisions: [
      "React + TypeScript + Vite for a fast, dependency-light client-side dashboard",
      "A provider-fallback pattern for market data rather than a single point of failure, with per-source backoff so an outage degrades one card instead of the page",
      "Cost basis and preferences in localStorage — the dashboard has no accounts and no backend to hold anyone's positions",
      "Modals loaded on open rather than on arrival, keeping the first paint small",
      "Deployed via GitHub Actions to a dedicated custom subdomain",
    ],
    tech: [
      "React",
      "TypeScript",
      "Vite",
      "wagmi",
      "viem",
      "Recharts",
      "TanStack Query",
      "GitHub Actions",
    ],
    links: [
      { label: "Live product", url: "https://bitcoin.edgarasneverdauskas.com" },
      { label: "Source", url: "https://github.com/Evirtual/bitcoin-analytics" },
    ],
    note: "Built with a heavily AI-assisted engineering workflow — product direction, architecture, review and final quality were mine throughout.",
    featured: true,
  },
  {
    slug: "social-blockchain-network",
    name: "Social Blockchain Network",
    logo: "/logos/social-blockchain-network.svg",
    role: "Independent Product Engineer",
    started: "2025",
    summary:
      "A social product where every write is a signed transaction: posts are minted as NFTs, and likes, comments, saves, follows and tips all settle on chain, running across three testnets at once.",
    problem:
      "Exploring what a social feed looks like when posts, reactions and tipping are on-chain primitives instead of rows in a database — including what that does to identity, ownership and creator payouts.",
    ownership: [
      "Product concept, architecture and implementation end to end",
      "The SocialPosts Solidity contract and its test suite, written with Hardhat and OpenZeppelin",
      "Wallet-based identity and on-chain post minting",
      "Wallet-signed likes, comments, saves and follows, plus direct creator tipping and withdrawal",
      "In-browser media preparation before upload — image cropping and ffmpeg.wasm video trimming",
      "IPFS media storage via Pinata, and subgraph-driven application data",
    ],
    challenges: [
      "Designing a feed UX where every write (post, like, comment, tip) is a signed on-chain transaction with real latency",
      "Indexing on-chain activity into a readable feed via subgraphs instead of a traditional database",
      "Keeping the feed usable when an indexer lags or goes down, without a database to fall back on",
      "Running the same application logic consistently across three separate testnets",
    ],
    decisions: [
      "Posts as NFTs and reactions as signed on-chain interactions, rather than bolting a wallet onto a conventional backend",
      "IPFS for media so post content isn't dependent on centralized storage",
      "Subgraph reads with a per-chain fallback to raw event logs over RPC, so one indexer outage degrades the feed instead of emptying it",
      "Deployed to Base Sepolia, Ethereum Sepolia and BSC Testnet as a multi-chain testbed before any mainnet decision",
    ],
    tech: [
      "React",
      "TypeScript",
      "Vite",
      "Solidity / Hardhat",
      "ethers",
      "NFTs",
      "Subgraphs",
      "IPFS",
      "ffmpeg.wasm",
      "Multi-chain",
    ],
    links: [
      { label: "Live testnet product", url: "https://social.edgarasneverdauskas.com" },
      {
        label: "Source",
        url: "https://github.com/Evirtual/social-blockchain-network",
      },
    ],
    note: "Runs on public testnets (Base Sepolia, Ethereum Sepolia, BSC Testnet) — no real funds involved.",
    featured: true,
  },
];

export type ExperienceEntry = {
  role: string;
  org: string;
  location: string;
  period: string;
  description: string;
};

export const experience: ExperienceEntry[] = [
  {
    role: "Founder & Product Engineer",
    org: "Ampuno",
    location: "Remote",
    period: "2026",
    description:
      "EV catalogue and comparison platform — data pipeline, product architecture, and end-to-end delivery.",
  },
  {
    role: "Independent Product Engineer",
    org: "Self-employed",
    location: "Remote",
    period: "2025 — 2026",
    description:
      "Building and shipping independent products across AI, data, Web3 and consumer technology — Self-Aware Writing, Bitcoin Analytics and the Social Blockchain Network.",
  },
  {
    role: "Frontend Engineer",
    org: "Fetch Oracle",
    location: "Cambodia · Remote",
    period: "2023 — 2026",
    description:
      "Frontend engineering for an oracle protocol and its own dashboard — oracle reporting, staking and reporting APR, disputes, voting and rewards. Testnet and configuration migration work, and developer-facing integration material. Contracts and backend were owned elsewhere.",
  },
  {
    role: "Frontend Engineer",
    org: "LiquidLoans",
    location: "Cambodia · Remote",
    period: "2022 — 2026",
    description:
      "Frontend engineering for a DeFi lending protocol — borrowing, Stability Pool interactions, staking, farming, redemptions and liquidations. Wallet integrations, ERC-20 balances, approvals and transaction-state handling against live on-chain financial state, plus adapting existing flows to an additional chain. Built with React, TypeScript, wagmi and subgraph-backed GraphQL; protocol design, contracts and backend were owned elsewhere.",
  },
  {
    role: "Founder & Product Engineer",
    org: "@unicorn",
    location: "Remote",
    period: "2022 — 2026",
    description:
      "Long-running social/self-expression product — product direction, UX, and application architecture through multiple iterations.",
  },
];

// The agency and in-house years behind the "10+ years" claim. Kept as one
// entry rather than four, because the work was the same craft throughout and
// four thin entries would say less than one substantiated one.
export const earlierExperience = [
  {
    role: "Frontend Developer",
    orgs: ["Clik"],
    period: "2021 — 2022",
    location: "Cambodia",
    description: [
      "Brought in on the design side before moving into frontend development — React, JavaScript and HTML/CSS, building and maintaining responsive product interfaces.",
    ],
  },
  {
    role: "Frontend Developer",
    orgs: ["Brave Agency", "Zazzle Media", "e4education"],
    period: "2015 — 2021",
    location: "United Kingdom",
    description: [
      "Agency and in-house frontend work — JavaScript and HTML/CSS, plus WordPress and PHP builds for client websites and web platforms, taken from design handoff through to production.",
    ],
  },
];

export type ExpertiseGroup = {
  title: string;
  items: string[];
};

export const expertise: ExpertiseGroup[] = [
  {
    title: "Frontend",
    items: [
      "React",
      "Next.js",
      "Astro",
      "TypeScript",
      "JavaScript",
      "Vite",
      "Vue",
      "HTML",
      "CSS / Sass",
      "Responsive design",
      "Component architecture",
    ],
  },
  {
    title: "Web3 / DeFi",
    items: [
      "ethers",
      "wagmi",
      "Wallet integrations",
      "ERC-20",
      "DeFi flows",
      "GraphQL",
      "Apollo",
      "Subgraphs",
      "On-chain data",
      "Oracle workflows",
    ],
  },
  {
    title: "AI / Product",
    items: [
      "OpenAI Codex",
      "Claude Code",
      "OpenAI APIs",
      "Vision workflows",
      "AI-assisted engineering",
      "Rapid prototyping",
      "Product development",
    ],
  },
  {
    title: "Quality / Delivery",
    items: [
      "Vitest",
      "Jest",
      "Playwright",
      "Git",
      "GitHub Actions",
      "REST APIs",
      "Debugging",
      "SEO / metadata",
      "GA4",
      "Firebase",
      "Cloudflare / Wrangler",
      "GitHub Pages",
    ],
  },
];
