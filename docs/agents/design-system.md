# Design System Agent Guide

This guide steers agents working in `packages/design-system`. It adapts Brad Frost's Atomic Design ideas to this repository's Vue + Storybook design system.

## Sources

- Atomic Design, chapter 1: design systems should move work away from isolated pages and toward systems of reusable components.
- Atomic Design, chapter 2: atoms, molecules, organisms, templates, and pages are a mental model for seeing a UI as both a whole and a collection of parts.
- Atomic Design, chapter 3: a pattern library should be the living place where components are named, composed, documented, and tested.
- Atomic Design, chapter 4: interface inventories help expose duplicate patterns, naming drift, and missing shared components.
- Atomic Design, chapter 5: a design system is a living product, not a one-time style guide artifact.

## Local Shape

The package already follows the useful part of Atomic Design:

- `src/atoms`: foundational UI primitives.
- `src/molecules`: small reusable compositions.
- `src/organisms`: larger sections made from atoms, molecules, or smaller organisms.
- Storybook stories live next to components and act as the pattern library.
- Public components are exported from `packages/design-system/package.json`.

Do not add `templates` or `pages` folders by default. In this monorepo, page-level layout and real route content usually belong in the Inertia app under `apps/romainlanz.com`. Promote something into the design system only when it is reusable across multiple app contexts or clearly defines a shared interface pattern.

## Classification Rules

Use the smallest category that preserves the component's meaning.

### Atoms

Use `atoms` for components that cannot be broken down further without losing their UI purpose.

Good atom signals:

- Wraps or standardizes a primitive element: button, link, checkbox, table, icon.
- Encodes visual language: logo, tag, panel, highlight, error code.
- Has broad applicability and no product workflow knowledge.
- Accepts content and state through props or slots instead of fetching or deciding app behavior.

Avoid atom bloat. If the component starts orchestrating several atoms into a specific task, it is probably a molecule.

### Molecules

Use `molecules` for simple groups of atoms that function together as one portable pattern.

Good molecule signals:

- Combines atoms into a small task: field, select field, article card, pagination, dialog.
- Has one clear responsibility and can be dropped into several places.
- Makes atoms useful in context, but does not own a whole page section.
- May expose events and slots, but should avoid app-specific data loading.

If a molecule needs many named regions, repeated child patterns, or section-level layout, consider an organism.

### Organisms

Use `organisms` for distinct interface sections.

Good organism signals:

- Represents a recognizable section: top bar, footer, newsletter form.
- Composes molecules and atoms into a larger unit.
- Can include repeated molecule instances.
- Defines section-level layout and interaction while staying reusable.

An organism may contain private child components inside its folder. Export only the public component through `package.json`.

## Templates And Pages

Use Atomic Design's `templates` and `pages` as thinking tools, not package folders.

- A template is a layout skeleton that shows content structure, constraints, and component relationships.
- A page is a concrete route instance using real or representative content to test the system's resilience.

In this repo, templates and pages usually map to the Inertia app. Use app pages and Storybook stories to test whether design-system components survive real headings, long excerpts, empty states, missing media, authenticated states, and mobile layouts.

When a page reveals a reusable pattern, extract the smallest stable part into the design system. Do not extract one-off route layout just because it looks component-shaped.

## Storybook Expectations

Storybook is the living pattern library for this package.

For every public component, keep or add a colocated `*.stories.ts` or `*.stories.tsx` file. Stories should show the behavior the app relies on, not every possible prop permutation.

Prefer stories that cover:

- Default usage.
- Meaningful variants.
- Interactive states such as loading, disabled, open, selected, error, or empty.
- Realistic content lengths, especially for cards, headlines, navigation, and forms.
- Responsive or constrained-width examples when layout can break.

For organisms, include stories with representative content and at least one stressful content case. This is how pages feed pressure back into the underlying patterns.

## Public API

Treat `package.json` exports as the design system's public interface.

- Add an export when a component is meant to be consumed by the app.
- Keep internal helper components private inside the owning component folder.
- Prefer package imports from the app, for example `@rlanz/design-system/button`, over reaching into `src`.
- When changing a public component API, search app usage first and update all call sites deliberately.

## Design-System First Workflow

When changing UI in the app, pause and decide where the change belongs:

- If the issue is a one-off page composition, change the Inertia page.
- If the issue affects a reusable component's behavior, accessibility, spacing, naming, or variants, change the design system.
- If several app files contain similar markup with tiny differences, make an interface inventory: list the examples, name the shared pattern, and extract only after the stable shape is clear.

This friction is intentional. Broken UI is often discovered in a page, but the durable fix may belong in the system.

## Component Creation Checklist

Before creating a component:

- Search `packages/design-system/src` for an existing pattern that can be extended.
- Search `apps/romainlanz.com` for similar markup to understand real usage.
- Pick `atom`, `molecule`, or `organism` based on responsibility, not visual size.
- Define props and slots around content structure, not one page's current content.
- Include accessibility behavior in the component, not in every consumer.
- Add or update a Storybook story.
- Export public components through `packages/design-system/package.json`.

## Naming

Names should describe the pattern's role in this product, not a generic framework category.

Prefer names that match how the site talks about the UI:

- `article_card` over generic `card` when the component is specifically for articles.
- `newsletter_form` over `signup_block` when the organism owns newsletter behavior.
- `top_bar` over `header` if that is the local product language.

If two similar components exist with unclear names, do not add a third. Inventory them, compare usage, and either merge them or document why they are separate.

## Verification

For design-system changes, run the narrowest useful checks first:

```bash
yarn workspace @rlanz/design-system typecheck
```

If the touched component is consumed by the app, also run the relevant app check:

```bash
yarn workspace @rlanz/site typecheck
```

Before committing broader UI changes, run the repository checks expected by the root `AGENTS.md`:

```bash
yarn lint
yarn format
yarn typecheck
```

Use Storybook for visual verification when component layout, interaction, or responsive behavior changes.
