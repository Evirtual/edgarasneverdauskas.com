export const site = {
  name: "Edgaras Neverdauskas",
  title: "Senior Product Engineer",
  tagline:
    "I build modern software products from idea to production across web, AI, data, fintech and Web3.",
  location: "Phnom Penh, Cambodia",
  email: "contact@edgarasneverdauskas.com",
  phone: "+855 81 680 954",
  url: "https://edgarasneverdauskas.com",
  linkedin: "https://kh.linkedin.com/in/edgarasneverdauskas",
  github: "https://github.com/Evirtual",
  cvPath: "/Edgaras_Neverdauskas_CV.pdf",
  stack: ["React", "TypeScript", "Next.js", "AI", "Web3", "Fintech"],
  yearsExperience: "10+",
};

export type ProjectLink = {
  label: string;
  url: string;
};

export type Project = {
  slug: string;
  name: string;
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
    slug: "liquidloans-fetch-oracle",
    name: "LiquidLoans / Fetch Oracle",
    role: "Frontend Engineer",
    period: "2022 — 2025",
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
    links: [],
    note: "Private professional engagement — source is not publicly available.",
    featured: true,
  },
  {
    slug: "atunicorn",
    name: "@unicorn",
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
    slug: "bitcoin-analytics",
    name: "Bitcoin Analytics",
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
    links: [],
    note: "Built with a heavily AI-assisted engineering workflow — product direction, architecture, review and final quality were mine throughout.",
    featured: true,
  },
  {
    slug: "photorank-ai",
    name: "PhotoRank AI",
    role: "Independent Product Engineer",
    period: "2026",
    status: "Independent product",
    summary:
      "An AI-powered image-ranking product with a mobile-first UX, vision-model analysis, and Stripe-based checkout — designed with a privacy-conscious, no-permanent-storage architecture.",
    problem:
      "Letting people rank and compare their own photos using AI analysis, without the product becoming a long-term store of their personal images.",
    ownership: [
      "Mobile-first Next.js application architecture",
      "Integration with OpenAI vision-capable models for configurable image analysis",
      "Stripe Checkout, payment verification and webhook handling",
      "Redis-compatible checkout ledger and temporary image-processing pipeline",
    ],
    challenges: [
      "Designing an image pipeline that supports AI analysis without persisting uploaded photos",
      "Verifying Stripe payments and webhooks reliably before releasing paid analysis results",
      "Keeping vision-model analysis configurable across different ranking packages",
    ],
    decisions: [
      "Temporary, non-persistent image handling as a deliberate privacy constraint rather than a default backend pattern",
      "A Redis-compatible ledger to track checkout/entitlement state without a full database",
      "Mobile-first layout given the primary use case: uploading photos from a phone",
    ],
    tech: [
      "Next.js",
      "OpenAI vision models",
      "Stripe Checkout",
      "Webhooks",
      "Redis-compatible storage",
    ],
    links: [],
    featured: true,
  },
];

export type OtherWork = {
  name: string;
  description: string;
};

export const otherWork: OtherWork[] = [
  {
    name: "Blockchain-native social network experiment",
    description:
      "An exploration of wallet-based identity and on-chain-anchored posts for a social product concept.",
  },
  {
    name: "Tokenization experiments",
    description:
      "Independent exploration of tokenization patterns and infrastructure in TypeScript.",
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
      "Building and shipping independent products across AI, data, Web3 and consumer technology, including PhotoRank AI, Bitcoin Analytics, and Web3 experiments.",
  },
  {
    role: "Frontend Engineer",
    org: "LiquidLoans ecosystem",
    location: "Remote",
    period: "2022 — 2025",
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
