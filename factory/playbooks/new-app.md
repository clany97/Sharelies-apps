# Playbook: new app (interactive)

Use this when a person is driving an agent locally. The unattended version is
`factory/prompts/factory-job.md`.

1. Act as the **planner** (`factory/roles/planner.md`). Write `SPEC.md`. Show it and wait
   for an OK.
2. Create a branch `app/<slug>`. Act as the **builder** (`factory/roles/builder.md`).
3. Act as the **reviewer** (`factory/roles/reviewer.md`). Fix anything marked "Needs work".
4. Run `npm run dev -w apps/<slug>` and show the app at phone and laptop widths.
5. Ask before committing or opening a pull request.

If your tool supports sub-agents, run each role as its own sub-agent so the reviewer
sees the work with fresh eyes.
