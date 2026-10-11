# Architecture

## The short version

One repo, many small apps, one website. Each app lives in its own folder, shares a common
look, and is built into a single static site on GitHub Pages.

```
Sharelies-apps/
├── apps/
│   ├── hub/            home page; lists every app automatically
│   └── <slug>/         one folder per app (app.json, SPEC.md, src/, src/theme.css)
├── packages/ui/        @sharelies/ui: shadcn/ui components + base tokens
├── house/house.json    house name and housemates' first names
├── templates/app/      starter every new app is copied from
├── factory/
│   ├── roles/          planner, builder, reviewer (tool-neutral)
│   ├── playbooks/      new-app, update-app (a person driving an agent)
│   ├── prompts/        factory-job.md (unattended GitHub runs)
│   ├── templates/      SPEC.md shape
│   └── scripts/        new-app, check-apps, build-site
├── .claude/            thin pointers so Claude Code finds factory/roles and playbooks
├── .github/            issue forms, CI, deploy, factory workflows
└── docs/               this file, factory.md, decisions/
```

## How a page gets to a phone

```
apps/<slug>/  ──npm run build──▶  site/<slug>/  ──deploy.yml──▶  clany97.github.io/Sharelies-apps/<slug>/
apps/hub/     ──npm run build──▶  site/         ──deploy.yml──▶  clany97.github.io/Sharelies-apps/
```

The hub reads every `apps/*/app.json` at build time, so a new app shows up on the home page
with no extra wiring. An app with `"status": "idea"` or `"retired"` is hidden.

## Two layers of design

```
packages/ui   shadcn/ui components + neutral tokens      (shared behaviour, accessibility)
     ▲
apps/<slug>/src/theme.css   that app's own design system  (colours, fonts, mood, signature styles)
apps/<slug>/src/components  that app's one-off components (a slot machine, a marquee…)
```

Every app gets solid, accessible building blocks for free, then dresses them for its own
theme. A retro cinema app and a pastel party game can look nothing alike.

## Why it's shaped this way

See `docs/decisions/`. The big ones:

- **0001**: a monorepo of static JavaScript apps on GitHub Pages: free, simple, nothing to run.
- **0002**: data stays on each phone until an app genuinely needs shared live data.
- **0003**: the factory is GitHub issues + a coding agent, with a human merge as the final gate.
- **0004**: shadcn/ui shared, design system per app.
