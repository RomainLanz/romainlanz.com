# Issue tracker: GitHub

Issues and PRDs for this repo live as GitHub issues in `RomainLanz/romainlanz.com`. Use the `gh` CLI for issue operations.

## Language

Write GitHub-bound content in French, including issue titles, issue bodies, PRD content, and implementation tickets.

## Conventions

- **Create an issue**: `gh issue create --title "..." --body "..."`.
- **Read an issue**: `gh issue view <number> --comments`, including labels when relevant.
- **List issues**: `gh issue list --state open --json number,title,body,labels,comments` with appropriate `--label` and `--state` filters.
- **Comment on an issue**: `gh issue comment <number> --body "..."`.
- **Apply or remove labels**: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`.
- **Close an issue**: `gh issue close <number> --comment "..."`.

Infer the repo from `git remote -v`; `gh` does this automatically when run inside the clone.

## When a skill says "publish to the issue tracker"

Create a GitHub issue in French.

## When a skill says "fetch the relevant ticket"

Run `gh issue view <number> --comments`.
