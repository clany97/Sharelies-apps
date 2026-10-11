# 0001: A monorepo of static apps on GitHub Pages

**Status:** accepted, 2026-10-10

## Decision

All house apps live in one repo as npm workspaces (`apps/*`, `packages/*`). Each is a
React + JavaScript + Vite static app, styled with Tailwind CSS. One build produces one site; GitHub Pages hosts it.

## Why

- Free, no servers to run or pay for, nothing to break while nobody's looking.
- One repo means one place for agents to learn the rules, and shared code (`@sharelies/ui`)
  without publishing packages.
- Plain JavaScript keeps apps quick to write and easy to read. React is what coding agents
  write most reliably.

## Trade-offs

- No backend, so no shared live data (see 0002).
- Every deploy rebuilds every app. Fine at sharehouse scale; revisit past ~30 apps.
