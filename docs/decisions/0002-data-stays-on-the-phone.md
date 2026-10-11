# 0002: Data stays on each phone, for now

**Status:** accepted, 2026-10-10. Revisit when the first app needs shared data.

## Decision

Apps save data in the browser (`localStorage`, keys `sharelies:<slug>:<thing>`). Shared,
read-only house facts live in `house/house.json`.

## When this changes

The first app where everyone must see the same thing live (a shared watched-list, a
house leaderboard) needs a small hosted database. Likely choice: Supabase or Firebase free tier, with a
public anon key and row-level rules. Write ADR 0004 before building it. The factory stops and
asks when it meets this case.
