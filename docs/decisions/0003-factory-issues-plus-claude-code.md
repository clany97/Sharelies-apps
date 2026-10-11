# 0003: The factory is GitHub issues + a coding agent

**Status:** accepted, 2026-10-10

## Decision

Housemates request apps with GitHub issue forms. Adding the `factory:build` label runs
Claude Code in GitHub Actions (`anthropics/claude-code-action`), which follows
`factory/prompts/factory-job.md` and opens a pull request. A human merges.

## Why

- The issue is the brief, the pull request is the delivery, CI is the inspector. All of it
  is visible and reversible in one place.
- A fixed job sheet (stations) is predictable and cheap compared with an open-ended agent.
- The roles and playbooks in `factory/` are tool-neutral. Claude Code runs them today
  (`/new-app`, `/update-app`, and the GitHub action); any other agent can follow the same files.
  Changing provider means swapping the action step in `factory.yml`, nothing else.

## Trade-offs

- Housemates need a GitHub account to file issues. If that's a barrier, add a simple form
  later that creates issues for them.
