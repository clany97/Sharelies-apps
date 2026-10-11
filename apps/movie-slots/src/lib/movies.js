import list from "../data/movies.json";

const slug = (s) => s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Checks every entry and gives each a stable ID. Throws (failing the build) on a bad entry. */
export function loadMovies(raw) {
  const seen = new Set();
  return raw.map((m, i) => {
    const where = `movies.json entry ${i + 1} (${m?.title ?? "no title"})`;
    if (!m?.title?.trim()) throw new Error(`${where}: missing title`);
    if (!Number.isInteger(m.year) || m.year < 1888 || m.year > 2100) throw new Error(`${where}: bad year`);
    if (!m.category?.trim()) throw new Error(`${where}: missing category`);
    const id = slug(`${m.title} ${m.year}`);
    if (seen.has(id)) throw new Error(`${where}: duplicate`);
    seen.add(id);
    return { ...m, id };
  });
}

export const MOVIES = loadMovies(list);
export const CATEGORIES = [...new Set(MOVIES.map((m) => m.category))].sort();
