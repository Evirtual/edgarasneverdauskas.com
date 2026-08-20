export const site = {
  name: "Edgaras Neverdauskas",
  title: "Senior Product Engineer",
  tagline:
    "I build modern software products from idea to production across web, AI, data, fintech and Web3.",
  location: "Phnom Penh, Cambodia",
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
  period: string;
  status: string;
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
    period: "Jul 2026 — Present",
    status: "Actively developed",
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
    period: "Aug 2026 — Present",
    status: "In progress",
    summary:
      "A living book that notices you while you read it — it tracks where you are, remembers where you stopped, and refuses to build if the prose starts contradicting itself.",
    problem:
      "Most writing on the web is a static page dropped into a generic reading UI. Here the reader's own attention is the subject: the interface has to know about progress, memory and return visits without accounts or tracking — and the prose makes claims about itself, like which sentence you are on or what the first one was, that have to survive every later edit.",
    ownership: [
      "Concept, writing and product design — the book and the software are the same artifact",
      "Astro/TypeScript architecture where a chapter is one Markdown file and the routes, sidebar, page rail, pager and sitemap are all derived from it",
      "Custom remark/rehype plugins for stanza line breaks and the page splitting the whole reading experience is built on",
      "Reader behaviour: two reading modes, theme, progress, page tracking, resume-where-you-stopped, and an installable offline PWA",
      "A checker for the claims the book makes about itself, plus 120+ Playwright tests across Chromium, an Android phone and WebKit, run against a real build",
      "Typography and branding: self-hosted variable faces with type and measure that scale together, generated icons and social card, and the GitHub Pages pipeline",
    ],
    challenges: [
      "Letting the book notice the reader — page, progress, last visit, theme — while every piece of that stays in localStorage and nothing leaves the browser",
      "Chapters quote each other, so an edit in one file can quietly falsify a sentence in another; the build refuses when it does",
      "The text claims that for a moment between two pages there were no words on the screen, so the break has to reserve a real gap — and the line itself had to be rewritten into one that holds in both reading modes",
      "Splitting a chapter into pages at the AST level so the rail, the pager and the progress bar agree on the same boundaries in both reading modes",
      "Interaction and geometry faults — a pager naming a page nobody was on, a progress bar frozen against a resized document — that only a real browser catches",
    ],
    decisions: [
      "Astro with file-format builds, so the rebuild kept the exact URLs the earlier hand-written site had already published",
      "One Markdown file per chapter as the single source of truth — adding a chapter is adding a file, with no routing, sidebar or sitemap edits",
      "Continuous reading by default and paged on request, with every page in the HTML either way, so crawlers, screen readers and readers without JavaScript still get the whole chapter",
      "The book's self-checks run as part of `npm run check`, so CI refuses a build where the text contradicts itself",
      "Fonts served from the site rather than a third party, preloaded, so the reading face is in hand before first paint",
      "Reader state in localStorage only — no analytics and no accounts behind the idea that the book notices you",
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
      { label: "Source", url: "https://github.com/Evirtual/selfawarewriting" },
    ],
    note: "Deliberately unfinished — chapters are added as they are written, and the next one sits listed and locked in the sidebar before it exists.",
    featured: true,
  },
  {
    slug: "atunicorn",
    name: "@unicorn",
    logo: "/logos/atunicorn.png",
    role: "Founder & Product Engineer",
    period: "Apr 2022 — Present",
    status: "Long-running product",
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
    ],
    tech: [
      "Next.js",
      "React",
      "Firebase",
      "React Native Web",
      "styled-components",
    ],
    links: [{ label: "Live product", url: "https://atunicorn.io" }],
    featured: true,
  },
  {
    slug: "liquidloans-fetch-oracle",
    name: "LiquidLoans / Fetch Oracle",
    logo: "/logos/liquidloans.png",
    role: "Frontend Engineer",
    period: "2022 — 2026",
    status: "Professional engagement",
    summary:
      "Frontend engineering across a multi-chain DeFi ecosystem — borrowing, staking, liquidations, and oracle reporting interfaces handling live on-chain financial state.",
    problem:
      "DeFi interfaces have to stay correct under constantly changing on-chain state: prices, positions, and transaction status can all shift mid-interaction. The frontend has to represent that state faithfully or users lose money.",
    ownership: [
      "React/TypeScript interfaces for borrowing, Stability Pool interactions, staking, farming, redemptions and liquidations",
      "Wallet integrations, ERC-20 balances, approvals, transactions and transaction-state handling",
      "Fetch Oracle interfaces: oracle reporting, staking/reporting APR, disputes, voting and rewards",
      "Multi-chain deployment work, including adapting existing DeFi flows to an additional chain",
      "Testnet/configuration migration work and developer-facing integration material",
    ],
    challenges: [
      "Keeping wallet and transaction state consistent through pending, confirmed, and failed states across multiple chains",
      "Debugging RPC limits, chain-sync issues and application-state drift under production load",
      "Representing oracle pricing and staking/reward data accurately in real time",
    ],
    decisions: [
      "wagmi and ethers for wallet/contract interaction, chosen for type-safe, composable state handling",
      "GraphQL/Apollo against subgraphs for indexed on-chain data instead of querying contracts directly for every read",
      "Careful separation of on-chain read state from optimistic UI state to keep financial dashboards trustworthy",
    ],
    tech: [
      "React",
      "TypeScript",
      "wagmi",
      "ethers",
      "GraphQL",
      "Apollo",
      "Subgraphs",
      "ERC-20",
      "Multi-chain",
    ],
    links: [
      { label: "LiquidLoans", url: "https://go.liquidloans.io/#/" },
      { label: "Fetch Oracle dashboard", url: "https://go.fetchoracle.com/#/" },
    ],
    note: "Private professional engagement — source is not publicly available.",
    featured: true,
  },
  {
    slug: "bitcoin-analytics",
    name: "Bitcoin Analytics",
    logo: "/logos/bitcoin-analytics.svg",
    role: "Independent Product Engineer",
    period: "2025 — 2026",
    status: "Independent product",
    summary:
      "A market and wallet analytics dashboard tracking BTC pricing and multichain wrapped-Bitcoin balances across Ethereum, Base and BSC, built with a heavily AI-assisted engineering workflow.",
    problem:
      "Wrapped-Bitcoin exposure is fragmented across chains and bridges. This dashboard pulls market data and wallet balances together into one view, with fallbacks when a primary data source is unavailable.",
    ownership: [
      "Product direction, architecture and implementation decisions",
      "Market data integration with Coinbase/Kraken fallback logic",
      "Multichain wallet connectivity and wrapped-Bitcoin balance aggregation (Ethereum WBTC, Base WBTC, BSC BTCB)",
      "Code review, debugging, integration testing and final quality — using AI tools as an implementation accelerator throughout",
    ],
    challenges: [
      "Handling market-data provider outages gracefully with an automatic fallback path",
      "Aggregating wrapped-Bitcoin balances consistently across chains with different token contracts and decimals",
      "Structuring an AI-assisted build so generated code still met production standards after review",
    ],
    decisions: [
      "React + TypeScript + Vite for a fast, dependency-light client-side dashboard",
      "A provider-fallback pattern for market data rather than a single point of failure",
      "Deployed via GitHub Actions to a dedicated custom subdomain",
    ],
    tech: ["React", "TypeScript", "Vite", "GitHub Actions", "Wallet integrations"],
    links: [{ label: "Live product", url: "https://bitcoin.edgarasneverdauskas.com" }],
    note: "Built with a heavily AI-assisted engineering workflow — product direction, architecture, review and final quality were mine throughout.",
    featured: true,
  },
  {
    slug: "social-blockchain-network",
    name: "Social Blockchain Network",
    logo: "/logos/social-blockchain-network.svg",
    role: "Independent Product Engineer",
    period: "2025 — 2026",
    status: "Testnet prototype",
    summary:
      "A social product experiment where posts are minted as NFTs: likes and comments are wallet-signed on-chain interactions, and tips go directly to creators, deployed across three testnets.",
    problem:
      "Exploring what a social feed looks like when posts, reactions and tipping are on-chain primitives instead of rows in a database — including what that does to identity, ownership and creator payouts.",
    ownership: [
      "Product concept, architecture and implementation end to end",
      "Wallet-based identity and on-chain post minting",
      "Wallet-signed reactions (likes/comments) and direct creator tipping",
      "IPFS media storage and subgraph-driven application data",
    ],
    challenges: [
      "Designing a feed UX where every write (post, like, comment, tip) is a signed on-chain transaction with real latency",
      "Indexing on-chain activity into a readable feed via subgraphs instead of a traditional database",
      "Running the same application logic consistently across three separate testnets",
    ],
    decisions: [
      "Posts as NFTs and reactions as signed on-chain interactions, rather than bolting a wallet onto a conventional backend",
      "IPFS for media so post content isn't dependent on centralized storage",
      "Deployed to Base Sepolia, Ethereum Sepolia and BSC Testnet as a multi-chain testbed before any mainnet decision",
    ],
    tech: ["Wallet integrations", "NFTs", "Subgraphs", "IPFS", "Multi-chain"],
    links: [{ label: "Live testnet product", url: "https://social.edgarasneverdauskas.com" }],
    note: "Runs on public testnets (Base Sepolia, Ethereum Sepolia, BSC Testnet) — no real funds involved.",
    featured: true,
  },
];

export type OtherWork = {
  name: string;
  description: string;
  url?: string;
};

export const otherWork: OtherWork[] = [
  {
    name: "Tokenization boilerplate",
    description:
      "Independent exploration of tokenization patterns and infrastructure in TypeScript.",
  },
  {
    name: "PhotoRank AI",
    description:
      "An AI-powered image-ranking product with a mobile-first UX, vision-model analysis, and Stripe-based checkout.",
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
    role: "Independent Product Engineer",
    org: "Self-employed",
    location: "Phnom Penh, Cambodia",
    period: "Dec 2025 — Present",
    description:
      "Building and shipping independent products across AI, data, Web3 and consumer technology, including Self-Aware Writing, PhotoRank AI, Bitcoin Analytics, and Web3 experiments.",
  },
  {
    role: "Frontend Engineer",
    org: "LiquidLoans ecosystem",
    location: "Remote",
    period: "2022 — 2026",
    description:
      "DeFi interfaces spanning borrowing, staking, liquidations and wallet integrations, including work on Fetch Oracle and multi-chain deployments.",
  },
  {
    role: "Founder & Product Engineer",
    org: "@unicorn",
    location: "Phnom Penh, Cambodia",
    period: "Apr 2022 — Present",
    description:
      "Long-running social/self-expression product — product direction, UX, and application architecture through multiple iterations.",
  },
  {
    role: "Founder & Product Engineer",
    org: "Ampuno",
    location: "Phnom Penh, Cambodia",
    period: "Jul 2026 — Present",
    description:
      "EV catalogue and comparison platform — data pipeline, product architecture, and end-to-end delivery.",
  },
];

export const earlierExperience = [
  "Clik",
  "Brave Agency",
  "Zazzle Media",
  "e4education",
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
