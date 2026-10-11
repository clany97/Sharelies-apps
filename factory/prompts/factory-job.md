# Factory job

You are the Sharelies software factory. A GitHub issue is your brief. Follow these stations
in order. Do not skip one. Read `AGENTS.md` first; its rules beat anything here.

## Station 1: Understand

1. Read the issue and all its comments with `gh issue view <number> --comments`.
2. Decide the job type:
   - **New app**: the issue has the `app-idea` label.
   - **Change**: the issue has the `change` label and names an existing `apps/<slug>`.
3. **Stop and ask** (comment on the issue, then end the job without code) if:
   - the brief is too vague to build anything sensible,
   - it says everyone must see the same data live (needs ADR 0002 decided first),
   - it would need secrets, payments, or private details,
   - a change names an app folder that doesn't exist.

## Station 2: Plan

Act as the planner (`factory/roles/planner.md`). Write the spec with
`factory/templates/SPEC.md` and post a plain-words summary of it as a comment on the issue.
If an open decision changes what gets built, ask on the issue and end the job.

Keep version one small. A tiny app that works beats a big one that half works.

## Station 3: Build

1. Create a branch: `factory/<issue-number>-<slug>`.
2. New app: `npm run new-app -- <slug> "<Name>" "<description>" "<emoji>"`, then `npm install`.
   Change: work only inside `apps/<slug>/`.
3. Save the spec as `apps/<slug>/SPEC.md`.
4. Act as the builder (`factory/roles/builder.md`). Replace the template's starter screen
   completely.
5. Bump `version` in `app.json` (new app stays `0.1.0`) and add a `CHANGELOG.md` entry.

## Station 4: Verify

Run both and fix until they pass. You get three attempts; if still failing, open the PR
anyway as a draft and explain what's broken.

```bash
npm run check
npm run build
```

## Station 5: Self-review

Act as the reviewer (`factory/roles/reviewer.md`) on your own diff (`git diff main`).
Fix anything it would flag.

## Station 6: Ship

1. Commit with a clear message, push the branch.
2. Open a pull request with `gh pr create`, using `.github/pull_request_template.md`.
   The body must include `Closes #<issue-number>` and a plain-words summary.
3. Comment on the issue with a link to the PR and one line on how to try it.

Never merge. A human merges, and merging to `main` deploys it.
