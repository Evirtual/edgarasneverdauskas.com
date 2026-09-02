// Registers ts-resolve-hooks.mjs. Loaded via `node --import` by the generator
// scripts, which is the only way to install a resolve hook before the entry
// module's own imports are resolved.
import { register } from "node:module";

// import.meta.url is already a file: URL, and is the parent the relative hook
// specifier resolves against.
register("./ts-resolve-hooks.mjs", import.meta.url);
