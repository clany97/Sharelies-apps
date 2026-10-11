import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@sharelies/ui/components/select";
import { CATEGORIES, MOVIES } from "./lib/movies";
import { Reel } from "./components/Reel";
import { Lever } from "./components/Lever";
import { Tower } from "./components/Tower";

const ANY = "any";
const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
const TIMING = REDUCED ? [0, 0, 0] : [1300, 1800, 2700]; // left, right, title: the title lands last

const rand = (n) => crypto.getRandomValues(new Uint32Array(1))[0] % n;
const sample = (arr, n) => Array.from({ length: n }, () => arr[rand(arr.length)]);

const IDLE = { left: ["", ""], title: [null, "Pull the lever", "Tonight's feature awaits"], right: ["", ""] };
const showing = (m) => {
  const [main, sub] = m.title.split(/: (.+)/);
  return { left: ["Category", m.category], title: ["Now showing", main, sub], right: ["Released", String(m.year)] };
};

export function App() {
  const [category, setCategory] = useState(ANY);
  const [shown, setShown] = useState([]); // offered this session, so nothing repeats until the rest have had a turn
  const [board, setBoard] = useState({ ...IDLE, spinId: 0, strips: null, movie: null });
  const [phase, setPhase] = useState("idle"); // idle | spinning | landed

  function spin() {
    if (phase === "spinning") return;
    const pool = MOVIES.filter((m) => category === ANY || m.category === category);
    const fresh = pool.filter((m) => !shown.includes(m.id) && m.id !== board.movie?.id);
    const from = fresh.length ? fresh : pool.filter((m) => m.id !== board.movie?.id);
    const next = from[rand(from.length)];
    setShown(fresh.length ? [...shown, next.id] : [next.id]);

    const target = showing(next);
    const reel = (key, fillers) => (REDUCED ? [target[key]] : [board[key], ...fillers, target[key]]);
    const fill = sample(MOVIES, 18);
    setBoard({
      ...target,
      movie: next,
      spinId: board.spinId + 1,
      strips: {
        left: reel("left", fill.slice(0, 10).map((m) => showing(m).left)),
        right: reel("right", fill.slice(0, 12).map((m) => showing(m).right)),
        title: reel("title", fill.map((m) => showing(m).title)),
      },
    });
    setPhase("spinning");
    setTimeout(() => setPhase("landed"), Math.max(...TIMING) + 150);
  }

  const strip = (key) => board.strips?.[key] ?? [board[key]];

  return (
    <div className="stage" data-phase={phase}>
      <a className="back" href={`${import.meta.env.BASE_URL}../`}>
        ← All apps
      </a>

      <h1 className="logo">
        <span>Sharelies Movie</span> <span>Pokie</span>
      </h1>

      <div className="machine">
        <section className="facade" aria-live="polite" aria-busy={phase === "spinning"}>
          <Tower />
          <div className="bulbs" />
          <div className="facade-body">
            <div className="wing wing-l" />
            <Reel className="board board-left" strip={strip("left")} spinId={board.spinId} duration={TIMING[0]}>
              {Letters}
            </Reel>
            <div className="tubes tubes-l" />
            <Reel className="neon" strip={strip("title")} spinId={board.spinId} duration={TIMING[2]}>
              {([kicker, main, sub]) => (
                <>
                  {kicker && <span className="neon-kicker">{kicker}</span>}
                  <span className="neon-main" style={fit(main)}>
                    {main}
                  </span>
                  {sub && <span className="neon-sub">{sub}</span>}
                </>
              )}
            </Reel>
            <div className="tubes tubes-r" />
            <Reel className="board board-right" strip={strip("right")} spinId={board.spinId} duration={TIMING[1]}>
              {Letters}
            </Reel>
            <div className="wing wing-r" />
          </div>
          <div className="bulbs bulbs-red" />
          <div className="canopy" />
          <div className="box-office">
            <span className="box-office-sign">Box office</span>
            <Select value={category} onValueChange={setCategory} disabled={phase === "spinning"}>
              <SelectTrigger className="box-office-select" aria-label="Category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="box-office-menu">
                <SelectItem value={ANY}>Any category</SelectItem>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </section>
        <Lever onPull={spin} disabled={phase === "spinning"} />
      </div>
    </div>
  );
}

function Letters([label, text]) {
  return (
    <>
      <span className="board-label">{label}</span>
      <span className="board-text">{text}</span>
    </>
  );
}

/** Title size inputs: overall length (so long titles wrap smaller) and longest word (so no word overflows). */
const fit = (title) => ({
  "--len": Math.max(title.length, 9),
  "--word": Math.max(...title.split(" ").map((w) => w.length), 5),
});
