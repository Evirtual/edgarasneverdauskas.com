import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: ["out/**", ".next/**", "playwright-report/**", "test-results/**"],
  },
  {
    // The site is a static export with `images.unoptimized`, so `next/image`
    // has nothing to optimize here: it would emit the same <img> and add
    // bundle weight. Everything on the page is an avatar or a small logo,
    // already sized to avoid layout shift.
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
];

export default eslintConfig;
