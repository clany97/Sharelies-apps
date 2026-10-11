// Usage: npm run new-app -- <slug> "<Name>" "<description>" "<emoji>"
import { cpSync, existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { APPS_DIR, RESERVED, ROOT, SLUG_RE } from "./lib.mjs";

const [slug, name, description = "A Sharelies house app.", emoji = "🏠"] = process.argv.slice(2);

if (!slug || !name) {
  console.error('Usage: npm run new-app -- <slug> "<Name>" "<description>" "<emoji>"');
  process.exit(1);
}
if (!SLUG_RE.test(slug) || RESERVED.has(slug)) {
  console.error(`"${slug}" is not a valid slug. Use lowercase words joined by hyphens, e.g. movie-slots.`);
  process.exit(1);
}
const target = join(APPS_DIR, slug);
if (existsSync(target)) {
  console.error(`apps/${slug} already exists.`);
  process.exit(1);
}

cpSync(join(ROOT, "templates", "app"), target, { recursive: true });
cpSync(join(ROOT, "factory", "templates", "SPEC.md"), join(target, "SPEC.md"));

const values = { __SLUG__: slug, __NAME__: name, __DESCRIPTION__: description, __EMOJI__: emoji };
function fill(path) {
  if (statSync(path).isDirectory()) return readdirSync(path).forEach((f) => fill(join(path, f)));
  let text = readFileSync(path, "utf8");
  for (const [key, value] of Object.entries(values)) text = text.replaceAll(key, value);
  writeFileSync(path, text);
}
fill(target);

console.log(`Created apps/${slug}. Next:\n  npm install\n  npm run dev -w apps/${slug}`);
