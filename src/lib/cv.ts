// CV-only prose. Everything factual — name, contact, roles, orgs, dates,
// expertise, product names — comes from content.ts, so the CV and the site
// cannot drift apart the way they did before. Only the longer-form bullets a
// CV wants and the site does not are written out here.
//
// Rendered to public/Edgaras_Neverdauskas_CV.pdf by scripts/generate-cv.mjs.

export const summary = {
  // Shown bold, as the opening claim.
  lead: "Product Engineer with 10+ years of software-development experience spanning product development, UI/UX, modern frontend architecture, Web3/DeFi and AI-enabled products.",
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
  // Two short bullets per product, each about one printed line: the CV sits
  // at two pages, and the longer versions pushed the seventh product onto a
  // third. An empty array would leave a product on the site only.
  jarvis: [
    "Iron Man–style voice assistant with a HUD of the machine's real readings; research runs as threads on a board.",
    "Answered by Gemini or ChatGPT with the user's own key, kept on the device; one back end shared by the PC app and the web version.",
  ],
  timeline: [
    "Comparative timeline with organisations as rows on a shared quarterly axis: who shipped what in the same quarter.",
    "Weighted events and folded quiet stretches keep a decade readable; every event has a dated source URL a script re-verifies.",
  ],
  ampuno: [
    "Normalizes 231 vehicle models and 1,105 variants from inconsistent multi-source data into one validated schema.",
    "Next.js static model and trim pages, a zod layer over raw data, Vitest and Playwright on search, filtering and comparison.",
  ],
  "self-aware-writing": [
    "A living book built with its software: an Astro/TypeScript site where a chapter is one Markdown file, with custom remark plugins.",
    "Reader state in localStorage, no accounts or analytics; 75 Playwright tests and a consistency checker that fails CI on contradictions.",
  ],
  atunicorn: [
    "Consumer social product in continuous iteration since 2022: authentication, profiles, posts and media upload.",
    "Progressive modernization instead of a rewrite, sharing logic between web and native surfaces via React Native Web.",
  ],
  "bitcoin-analytics": [
    "React/TypeScript/Vite dashboard for BTC market data: returns, volatility, drawdowns, moving averages, heatmap and Fear & Greed.",
    "Coinbase/Kraken fallback with per-source backoff so an outage degrades one card; wrapped-BTC balances across Ethereum, Base and BSC.",
  ],
  "social-blockchain-network": [
    "Social product where every write is a signed transaction: posts minted as NFTs, likes, comments, follows and tips on chain.",
    "Wrote the SocialPosts Solidity contract and Hardhat tests; in-browser media cropping and ffmpeg.wasm trimming, stored on IPFS.",
  ],
};

export const languages = [
  { name: "Lithuanian", level: "Native" },
  { name: "English", level: "Fluent — full professional proficiency" },
];
