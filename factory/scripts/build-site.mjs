// Builds the whole Pages site into site/: the hub at the root, each app at site/<slug>/.
import { execFileSync } from "node:child_process";
import { rmSync } from "node:fs";
import { join } from "node:path";
import { REPO_NAME, ROOT, listApps } from "./lib.mjs";

const base = process.env.SITE_BASE ?? `/${REPO_NAME}/`;
const out = join(ROOT, "site");
rmSync(out, { recursive: true, force: true });

function build(dir, basePath, outDir) {
  console.log(`\n▸ Building ${dir.replace(ROOT + "/", "")} → ${basePath}`);
  execFileSync("npx", ["vite", "build"], {
    cwd: dir,
    stdio: "inherit",
    env: { ...process.env, BASE_PATH: basePath, OUT_DIR: outDir },
  });
}

build(join(ROOT, "apps", "hub"), base, out);
for (const { dir, meta } of listApps()) {
  if (meta.status === "idea") continue;
  build(dir, `${base}${meta.slug}/`, join(out, meta.slug));
}
console.log(`\n✓ Site built in site/ (base ${base})`);
