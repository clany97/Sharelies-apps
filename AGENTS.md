# AGENTS.md

The single source of instructions for any coding agent and any person working in this repo.
It is written to be tool-neutral: it works the same for Claude Code, Codex, Cursor, Copilot,
Gemini, Aider or anything else. Tool-specific files only point back here (see
"Tool adapters" at the end) and must never contain rules of their own.

## What this repo is

Fun little web apps for the Sharelies sharehouse: games, randomisers, movie-night toys.
Not house admin. Every app is a static web app served from one GitHub Pages site,
`https://clany97.github.io/Sharelies-apps/`, with a hub page at the root listing them all.

Housemates use these on iPhones and laptops. Each app should feel like its own little
world with a strong look, and be obvious to use with zero instructions.

## Stack

- **JavaScript + React** (`.jsx`), built with **Vite**. No TypeScript.
- **Tailwind CSS v4** for styling.
- **shadcn/ui** as the shared component library, living in `packages/ui`.
- **Each app has its own design system** in `apps/<slug>/src/theme.css`, layered on top of
  shadcn: its own tokens (colours, fonts, radius) plus app-specific styles and components.

## Layout

| Path | What lives there |
| --- | --- |
| `apps/<slug>/` | One app per folder: `app.json` (manifest), `SPEC.md`, `src/`, `CHANGELOG.md`. |
| `apps/<slug>/src/theme.css` | That app's design system. Restyle the app here. |
| `apps/hub/` | The home page. Reads every `app.json` at build time. |
| `packages/ui/` | `@sharelies/ui`: shadcn components, `cn()` helper, base tokens, `AppShell`. |
| `house/house.json` | House name and housemates' first names. Read-only to apps. |
| `templates/app/` | The starter every new app is copied from. |
| `factory/roles/` | The planner, builder and reviewer roles. |
| `factory/playbooks/` | Step-by-step guides for building or changing an app with a person. |
| `factory/prompts/factory-job.md` | The unattended job sheet used by the GitHub factory. |
| `factory/templates/SPEC.md` | The shape of every app spec. |
| `docs/` | Architecture, factory, and decision records (`docs/decisions/`). |

## How work happens

Every app starts with a `SPEC.md` (planner), then gets built (builder), then reviewed
(reviewer). Follow `factory/playbooks/new-app.md` or `factory/playbooks/update-app.md`.
If your tool can run sub-agents, give each role its own.

To scaffold a new app, never hand-copy the template. Run:

```bash
npm run new-app -- <slug> "<Name>" "<one-line description>" "<emoji>"
```

## Two principles that beat everything else

### 1. Concise beats more

More code is not better code. Build exactly what the spec asks, to a high standard, in as
little code as does the job well. Over-building is a known coding-agent habit; resist it.
No speculative features, options, abstractions, files or dependencies "for later". When
two approaches work, pick the one with fewer moving parts. A great app with 300 clear lines
beats a good one with 3,000.

### 2. Exceptional, never generic

Every app must feel crafted, unique and delightful. Nobody should be able to tell an agent
built it. Each app takes one specific real-world inspiration (a cinema marquee, a 90s pokies
machine, a vintage arcade) and commits to it fully, in look, motion, sound and words.

- **Craft over volume.** Exceptional comes from details, not from more features: a typeface
  chosen for the theme, real texture and light, motion with physical weight (springs,
  overshoot, a satisfying stop), copy with personality, and edge states (empty, sold out,
  first run) designed as carefully as the happy path.
- **One signature moment** per app, polished until it's genuinely fun to repeat.
- **Never ship the tells of generated UI:** untouched shadcn defaults, centred stacks of
  rounded cards, purple-to-blue gradients, emoji standing in for design, Inter on white,
  glassmorphism for its own sake, generic "Welcome to X!" copy, identical spacing everywhere.
- shadcn supplies behaviour and accessibility. The app's `theme.css` and its own
  components supply the soul.

## Non-negotiable rules

1. **The spec leads.** Build what `apps/<slug>/SPEC.md` says. If the work needs to differ,
   update the spec first and say so.
2. **One app, one folder.** A change for an app touches only `apps/<slug>/` unless the task
   explicitly says to change shared code. Never change another app as a side effect.
3. **shadcn first, then theme.** Use components from `@sharelies/ui/components/*` and
   restyle them through the app's `theme.css`. Add new shadcn components to `packages/ui`
   (run `npx shadcn@latest add <name>` inside `packages/ui`, then check every import uses
   `@sharelies/ui/lib/utils`). Never put one app's look into `packages/ui`.
4. **Static only.** Apps build to plain files. No servers, no secrets, no API keys.
   Saved data lives in the browser until `docs/decisions/` says otherwise. If an app needs
   data shared between devices, stop and raise it; that needs a decision first (ADR 0002).
5. **No private details in git.** First names in `house/house.json` are the limit.
6. **iPhone and laptop, both first-class.** Design for 375px wide first, respect iPhone
   safe areas (`env(safe-area-inset-*)`, `100dvh`), tap targets at least 44px, inputs at
   least 16px text so iOS doesn't zoom. Then use the space well on a laptop.
7. **Motion with manners.** Animations are welcome; honour `prefers-reduced-motion`.
8. **Small dependencies.** Prefer the platform. Add an npm package only if it saves real
   work, and add it to the app's own `package.json`.
9. **Done means green.** `npm run check` and `npm run build` pass, and you've looked at the
   app at phone and laptop widths.
10. **Bookkeeping.** Bump `version` in `app.json` and add a line to `CHANGELOG.md` for every
    change a housemate would notice.

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | Install everything. |
| `npm run dev -w apps/<slug>` | Run one app locally (also reachable from a phone on the same Wi-Fi). |
| `npm run new-app -- ...` | Scaffold a new app from the template. |
| `npm run check` | Validate every `app.json` and the repo rules. |
| `npm run build` | Build the whole site into `site/`, exactly as deployed. |
| `npm run preview` | Serve `site/` locally. |

## The factory

Unattended runs start from a GitHub issue labelled `factory:build`. The issue is the brief;
the agent follows `factory/prompts/factory-job.md`, works on a branch and opens a pull
request that says `Closes #<issue>`. A human always merges, and merging deploys.

## Tool adapters

These exist only so specific tools find the instructions above. They hold no rules.

| Tool | Adapter |
| --- | --- |
| Claude Code | `CLAUDE.md`, `.claude/agents/*` and `.claude/commands/*` point to `factory/roles` and `factory/playbooks` |
| GitHub factory | `.github/workflows/factory.yml` (currently runs Claude Code; swap the action step to change provider) |
| Everything else | Reads `AGENTS.md` directly |
