# 0004: shadcn/ui shared, a design system per app

**Status:** accepted, 2026-10-10

## Decision

`packages/ui` holds shadcn/ui components (JavaScript, Tailwind v4, CSS-variable tokens) with
a neutral look. Each app imports them and defines its own design system in
`src/theme.css`: token overrides, fonts, and app-specific styles. One-off components
(a slot machine, a marquee) live in the app's own `src/components/`.

## Why

- shadcn gives accessible, well-behaved building blocks (dialogs, selects, sheets) that we
  own as source code, so they can be restyled freely.
- These are fun apps; each one should have its own personality, drawn from its own
  inspiration. Shared tokens would flatten that.

## Trade-offs

- Upgrading a shadcn component changes every app that uses it. Check the hub and each app
  build when doing so (`npm run build` does).
- The shadcn CLI sometimes writes a bare `cn` import in a monorepo. After adding a component,
  check imports use `@sharelies/ui/lib/utils`.
