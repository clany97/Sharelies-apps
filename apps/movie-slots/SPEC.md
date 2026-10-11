# 🎰 Sharelies Movie Pokie: spec

**Status:** built (0.1.0) · **Slug:** `movie-slots` · **Version:** 0.1.0

## The idea in one line

A 90s pokies machine built into a neon cinema marquee: pull the lever, the marquee spins
like slot reels and lands on tonight's movie. Spin until something sticks.

## Who and when

Housemates on movie night, on an iPhone or the laptop plugged into the TV. Pick a category
(or don't), spin until something sticks, watch it.

## Requirements (version one)

| ID | Requirement | How to test it |
|---|---|---|
| R1 | Pulling the lever spins the reels and lands on a random movie (fair pick). | Spin 10 times; each lands on a real movie from the list. |
| R2 | The lever can be dragged down or tapped; Space also pulls it on a laptop. | Try each on phone and laptop. |
| R3 | Spin as many times as you like. A movie skipped this session won't repeat until the rest of the pool has had a turn. | In a 6-movie category, 6 spins show 6 different movies. |
| R4 | Optionally pick one category before spinning; default is "Any category". | Pick Sports Comedy; every spin is sports comedy. |
| R5 | Movies come from one reference file, `src/data/movies.json`. A bad entry fails the build and names it. | Add a broken entry; `npm run build` says which. |
| R6 | Works well on iPhone (portrait, 375px up, safe areas, lever doesn't scroll the page) and laptop (full wide marquee, readable on a TV). Add to Home Screen opens full screen. | iPhone SE and Pro Max sizes; 1440×900. |
| R7 | Honours Reduce Motion: reels fade to the result, bulbs stay still. | Turn on Reduce Motion. |

## Screens and flow

One screen: the theatre front. Tower, marquee (category board · title sign · year board),
canopy, and the BOX OFFICE sign holding the category picker. The lever hangs off the right.

```
[category?] ─▶ pull lever ─▶ reels spin ─▶ land ─▶ pull again, or go watch it
```

## Data

**Movie list (in git):** `src/data/movies.json`, supplied by Lachie (86 films, 7 categories).
Validated when the app builds. A movie's ID is its title and year as a slug
(`step-brothers-2008`), so editing the file never breaks watched history.

```json
{ "title": "Step Brothers", "year": 2008, "category": "Bro & Buddy" }
```

Categories come from the file itself; add a new one by using it.

Nothing is saved. Spins remember what they've offered only for the current visit.

## Design brief

- **Inspiration:** the Atlas 9 neon cinema marquee at night, copied closely, whose sign faces
  spin like a 90s pub pokies machine. The theatre front is the main UI: art deco neon tower,
  warm bulb row, black centre sign flanked by stacked blue tubes, angled white letter boards,
  blue neon wings, red bulb row, bulb-lit canopy, teal BOX OFFICE sign (holding the category
  picker).
- **Sign content:** centre sign shows a gold "Now showing" line over the title (subtitle
  after a colon drops to a pink second line). Left board: "Category" + category. Right
  board: "Released" + year. On the landing screen both side boards are blank and the centre
  reads "Pull the lever".
- **Mood:** neon, nostalgic, showtime.
- **Palette:** night `#07060d`, neon cyan `#2de2e6`, neon pink `#ff3fa4`, tube blue `#3a6bff`,
  bulb gold `#ffcf6e`, letter-board white `#f3efe6` with red `#d62839` and black letters,
  box-office teal `#1d5f5a`.
- **Type:** Righteous for the neon title, Bebas Neue for letter boards (bundled via
  `@fontsource`), system font for everything else.
- **Signature moment:** the lever pull. Chrome lever, red ball. Pull it down, it springs back,
  the bulbs chase, three reels (category · title · year) blur; the side reels clunk to a stop
  first and the title lands last, then the neon title flickers on and the bulbs flash.
- **Motion:** CSS transforms and opacity only, about 2.5 seconds a spin.

## How it's built

`data/movies.json`, `lib/movies.js` (validate, IDs), `components/Reel.jsx`,
`components/Lever.jsx`, `components/Tower.jsx`, `App.jsx` (spin logic, layout). Styling in
`theme.css`: two typefaces only (Righteous for neon, Bebas Neue for everything else).
shadcn used: `Select`. Plus a web manifest and icon for the home screen.

## Later (not version one)

Watched tracking (removed on 2026-10-11, the spinner is enough) · sound effects · posters ·
runtime/decade filters · hold a reel.

## Decisions

| # | Decision | Agreed (2026-10-10) |
|---|---|---|
| D1 | Watched tracking | None. Pure spinner, no saved data (changed 2026-10-11). |
| D2 | The movie list | Lachie's JSON list, used as-is with its categories. |
| D3 | Layout | **A**: the marquee is the machine. On phones it stacks: neon title on top, the two letter boards below, lever on the right edge. |
| D4 | Name | Sharelies Movie Pokie (changed from Reel Deal on Lachie's request). |
