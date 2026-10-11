import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
export const APPS_DIR = join(ROOT, "apps");
export const REPO_NAME = "Sharelies-apps";
export const SLUG_RE = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;
export const RESERVED = new Set(["hub", "assets", "ui", "api"]);

/** Every app folder that has an app.json, hub excluded. */
export function listApps() {
  return readdirSync(APPS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name !== "hub")
    .map((d) => join(APPS_DIR, d.name))
    .filter((dir) => existsSync(join(dir, "app.json")))
    .map((dir) => ({ dir, meta: JSON.parse(readFileSync(join(dir, "app.json"), "utf8")) }));
}
