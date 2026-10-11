# The software factory

The factory turns a housemate's idea into a working, deployed app, with you approving
at the end. It's a fixed assembly line, not a free-roaming agent.

```
 Issue form ──▶ label factory:build ──▶ Agent: understand → plan → build → verify → self-review
                                                                                   │
            live on Pages ◀── deploy.yml ◀── you merge ◀── CI passes ◀── pull request
```

## Stations

| # | Station | Who | Where it's defined |
|---|---|---|---|
| 1 | Brief | A housemate | `.github/ISSUE_TEMPLATE/` |
| 2 | Start | You add the `factory:build` label | `.github/workflows/factory.yml` |
| 3 | Understand, plan, build, verify, self-review | Coding agent (Claude Code today) | `factory/prompts/factory-job.md`, `factory/roles/` |
| 4 | Quality gate | CI | `.github/workflows/ci.yml`, `factory/scripts/check-apps.mjs` |
| 5 | Approve | You review and merge | GitHub pull request |
| 6 | Ship | Deploy | `.github/workflows/deploy.yml` |

## Three ways to drive it

1. **Hands-off (GitHub):** label an issue `factory:build`. The agent opens a pull request.
2. **Follow-up (GitHub):** comment `@claude make the buttons bigger` on the pull request.
   The agent pushes a fix to the same branch.
3. **Hands-on (your laptop):** ask any coding agent to follow `factory/playbooks/new-app.md`.
   In Claude Code that's `/new-app <idea>` or `/update-app <slug> <change>`. Same roles, but
   it stops to check with you at each step.

## Safety rails

- Only the repo owner can start the factory (the workflow checks who triggered it).
- The agent can't merge. Merging to `main` is the only thing that deploys.
- CI blocks merges if an `app.json` is broken, a type check fails, the build fails, or a
  secret-shaped string turns up.
- Each run has a 30 minute timeout and a turn limit.
- The agent stops and asks on the issue when a brief is vague or needs a decision.

## One-time setup

1. **Pages:** repo Settings → Pages → Source: **GitHub Actions**.
2. **Claude app:** install the Claude GitHub app on this repo
   (in Claude Code: `/install-github-app`, or https://github.com/apps/claude).
3. **Secret:** add `CLAUDE_CODE_OAUTH_TOKEN` under Settings → Secrets and variables → Actions.
   Get it by running `claude setup-token`. It uses your Claude subscription.
4. **Labels:** create `factory:build`, `app-idea`, `change`.
5. **Branch protection (recommended):** protect `main`, require the CI check to pass.
