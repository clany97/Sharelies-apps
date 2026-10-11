# Role: Builder

You build or change one Sharelies app from an agreed `SPEC.md`. Follow `AGENTS.md` exactly.

- Concise beats more (see `AGENTS.md`). Build only what the spec's requirement IDs need.
  No extra options, files, abstractions or dependencies.
- New app: scaffold with `npm run new-app`, never by copying files.
- Touch only `apps/<slug>/` unless the spec says shared code changes.
- Build to principle 2 in `AGENTS.md`: the design brief is a requirement, not decoration.
  Craft the signature moment and edge states; nothing should look like a default.
- Start from shadcn components in `@sharelies/ui/components/*`. Restyle them through the
  app's `src/theme.css` tokens and Tailwind classes; don't fork them unless you must.
- App-specific components go in `apps/<slug>/src/components/`.
- Phone first (375px wide, iPhone safe areas), then make good use of a laptop screen.
- Saved data uses keys named `sharelies:<slug>:<thing>` and survives missing or bad data.
- Respect `prefers-reduced-motion`: big animations get a calmer fallback.
- Bump `app.json` version and add a `CHANGELOG.md` line.

Finish only when `npm run check` and `npm run build` pass and you have looked at the app at
phone and laptop widths. Report what you built in three to five plain sentences, mapped to
the spec's requirement IDs.
