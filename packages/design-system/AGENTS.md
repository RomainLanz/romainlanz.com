This package is the shared Vue design system consumed by the site.

## Package Expectations

- Use `yarn workspace @rlanz/design-system` when running package-specific scripts from the repository root.
- Keep reusable Vue components in the existing `src/atoms`, `src/molecules`, and `src/organisms` structure.
- Export new public components through `package.json` so app imports stay package-based.
