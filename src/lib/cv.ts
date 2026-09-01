// CV-only prose. Everything factual — name, contact, roles, orgs, dates,
// expertise, product names — comes from content.ts, so the CV and the site
// cannot drift apart the way they did before. Only the longer-form bullets a
// CV wants and the site does not are written out here.
//
// Rendered to public/Edgaras_Neverdauskas_CV.pdf by scripts/generate-cv.mjs.

export const summary = {
  // Shown bold, as the opening claim.
  lead: "Senior Product Engineer with 10+ years of software-development experience spanning product development, UI/UX, modern frontend architecture, Web3/DeFi and AI-enabled products.",
  rest: "Experienced in taking ideas from concept to working product — shaping product direction and user experience while owning technical decisions, implementation and delivery, across both hands-on development and advisory work.",
};

// Keyed by the `org` in content.ts `experience`, so a role renamed there
// surfaces here as a missing key rather than silently losing its bullets.
export const experienceBullets: Record<string, string[]> = {
  "Self-employed": [
    "Build and ship independent software products across AI, data, Web3 and consumer technology, owning architecture, implementation, testing and deployment from concept to working product.",
    "Use OpenAI Codex and Claude Code extensively as engineering accelerators while retaining responsibility for product direction, architecture, review, debugging and final quality.",
  ],
  LiquidLoans: [
    "Built and maintained React/TypeScript DeFi interfaces spanning borrowing, Stability Pool, staking, farming, redemptions and liquidations, with wallet integration, ERC-20 balances and transaction-state handling.",
    "Used wagmi, ethers and GraphQL/subgraphs to power financial dashboards from on-chain data, investigating RPC limits and chain-sync issues; contributed to deployments across multiple networks, including PulseChain. Frontend within an existing team; protocol design, contracts and backend were owned elsewhere.",
  ],
  "Fetch Oracle": [
    "Principal frontend contributor to the Fetch Oracle dashboard: oracle reporting, staking and reporting APR, disputes, voting, rewards and wallet/account state against live on-chain data.",
    "Testnet and configuration migration work, developer-facing integration material and production debugging; contracts and backend were owned elsewhere.",
  ],
  // Detailed under Selected products; the timeline only shows continuity.
  // Framed as the role, not the product — the product detail is under
  // Selected products, and a dated title with nothing under it reads as
  // unfinished.
  "@unicorn": [
    "Founded and ran a consumer social product over four years, owning product direction, UX and application architecture through several platform iterations.",
  ],
  // Detailed under Selected products; excluded from the CV timeline entirely.
  Ampuno: [],
};

// Keyed by `slug` in content.ts `projects`.
export const productBullets: Record<string, string[]> = {
  ampuno: [
    "Normalizes 231 vehicle models and 1,105 variants from inconsistent multi-source specification data into a single validated schema.",
    "Next.js App Router with static generation for model and trim pages, a zod validation layer between raw source data and the rendered catalogue, and Vitest plus Playwright covering data correctness and search, filtering and comparison flows.",
  ],
  "self-aware-writing": [
    "A living book built as one artifact with its software: an Astro/TypeScript site where a chapter is one Markdown file, with custom remark/rehype plugins for stanza breaks and in-chapter page splitting.",
    "Reader state — progress, resume, theme, two reading modes — is held in localStorage with no accounts or analytics; 75 Playwright tests run across desktop, mobile and Safari, and a self-consistency checker fails CI when chapters contradict each other.",
  ],
  atunicorn: [
    "Long-running consumer social product in continuous iteration since 2022, spanning authentication, profiles, posts and media upload flows.",
    "Progressive modernization of the stack rather than a disruptive rewrite, sharing application logic between web and native-leaning surfaces via React Native Web.",
  ],
  "bitcoin-analytics": [
    "React + TypeScript + Vite dashboard for BTC market data: returns, volatility, drawdowns, moving averages, price bands, a returns heatmap and volume across 1D/1W/1M ranges, plus Fear & Greed market mood.",
    "Coinbase/Kraken provider fallback with per-source backoff so an outage degrades one card rather than the page; wallet-connected multichain wrapped-Bitcoin balances across Ethereum, Base and BSC, with cost basis held in the browser.",
  ],
  "social-blockchain-network": [
    "A social product where every write is a signed transaction: posts minted as NFTs, and likes, comments, saves, follows and tips settling on chain across Base Sepolia, Ethereum Sepolia and BSC Testnet.",
    "Wrote the SocialPosts Solidity contract and its Hardhat test suite; media prepared in-browser with image cropping and ffmpeg.wasm video trimming, stored on IPFS, with subgraph reads falling back to raw event logs per chain.",
  ],
};

export const languages = [
  { name: "Lithuanian", level: "Native" },
  { name: "English", level: "Fluent — full professional proficiency" },
];
