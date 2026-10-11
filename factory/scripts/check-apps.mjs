// Validates every app manifest and the repo's hard rules. Run by CI on every pull request.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { RESERVED, ROOT, SLUG_RE, listApps } from "./lib.mjs";

const errors = [];
const STATUSES = new Set(["idea", "beta", "live", "retired"]);
const REQUIRED = ["slug", "name", "description", "emoji", "status", "version", "owner"];

for (const { dir, meta } of listApps()) {
  const where = relative(ROOT, dir);
  const folder = dir.split("/").pop();
  for (const key of REQUIRED) if (!meta[key]) errors.push(`${where}/app.json: missing "${key}"`);
  if (meta.slug !== folder) errors.push(`${where}/app.json: slug "${meta.slug}" must match folder "${folder}"`);
  if (!SLUG_RE.test(folder) || RESERVED.has(folder)) errors.push(`${where}: folder name is not a valid slug`);
  if (meta.status && !STATUSES.has(meta.status)) errors.push(`${where}/app.json: status must be one of ${[...STATUSES].join(", ")}`);
  if (meta.version && !/^\d+\.\d+\.\d+$/.test(meta.version)) errors.push(`${where}/app.json: version must look like 1.2.3`);
  for (const file of ["package.json", "index.html", "vite.config.js", "CHANGELOG.md", "SPEC.md", "src/main.jsx", "src/theme.css"]) {
    if (!existsSync(join(dir, file))) errors.push(`${where}: missing ${file}`);
  }
  const text = JSON.stringify(meta) + (existsSync(join(dir, "README.md")) ? readFileSync(join(dir, "README.md"), "utf8") : "");
  if (/__(SLUG|NAME|DESCRIPTION|EMOJI)__/.test(text)) errors.push(`${where}: template placeholders were not filled in`);
}

// Rule 5: no secrets in git. A cheap scan for the obvious shapes.
const SECRET_RE = /(sk-ant-[A-Za-z0-9_-]{10,}|sk-[A-Za-z0-9]{20,}|ghp_[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16}|-----BEGIN [A-Z ]*PRIVATE KEY-----)/;
const SKIP = new Set(["node_modules", ".git", "site", "dist"]);
function scan(path) {
  for (const name of readdirSync(path)) {
    if (SKIP.has(name)) continue;
    const full = join(path, name);
    if (statSync(full).isDirectory()) scan(full);
    else if (statSync(full).size < 1_000_000 && SECRET_RE.test(readFileSync(full, "utf8"))) {
      errors.push(`${relative(ROOT, full)}: looks like it contains a secret key`);
    }
  }
}
scan(ROOT);

if (errors.length) {
  console.error(`✗ ${errors.length} problem(s):\n` + errors.map((e) => `  - ${e}`).join("\n"));
  process.exit(1);
}
console.log(`✓ ${listApps().length} app(s) look good.`);
