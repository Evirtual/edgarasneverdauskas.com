// Resolve hook: lets the generator scripts import the app's own TypeScript.
//
// The app is bundled by Next, so its internal imports are written the way a
// bundler wants them — `./content`, `./land-mask`, no file extension. Plain
// Node ESM requires the extension and fails on those, which is what stopped
// the CV and cover generators from reusing `src/lib` instead of restating it.
//
// So: try the specifier as written, and on a miss retry it with `.ts`. Only
// relative specifiers with no extension are retried, so a genuinely missing
// package still fails as itself rather than as a confusing `.ts` lookup.
export async function resolve(specifier, context, nextResolve) {
  try {
    return await nextResolve(specifier, context);
  } catch (error) {
    const relative = specifier.startsWith("./") || specifier.startsWith("../");
    const bare = !/\.[a-z]+$/i.test(specifier);
    if (error?.code === "ERR_MODULE_NOT_FOUND" && relative && bare) {
      return await nextResolve(`${specifier}.ts`, context);
    }
    throw error;
  }
}
