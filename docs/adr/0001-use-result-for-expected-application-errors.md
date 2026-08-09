# Use `Result` for expected application errors

## Status

Accepted.

## Context

Application code under `apps/romainlanz.com/src` must stay independent from HTTP delivery. A generic application exception such as `RecordNotFoundError` does not carry enough context: the same absence may be a 404 on a public route, a form error in an administration flow, or a broken invariant in a background process. Mapping such exceptions in the global AdonisJS handler makes that handler an implicit registry of application errors.

At the same time, converting every nullable lookup or technical failure to `Result` would hide useful distinctions and make ordinary repository APIs unnecessarily heavy.

## Decision

Use the minimal shared `Result<TValue, TError>` type from `src/core/result.ts` when a use case has an expected failure that its caller can usefully handle:

```ts
type Result<TValue, TError> = { ok: true; value: TValue } | { ok: false; error: TError };
```

Each action, query, service, or repository that exposes expected failures owns a discriminated error union named for that operation. Error variants use a `type` discriminant and do not contain HTTP statuses, response messages, Inertia pages, redirects, or flash keys. Do not create a global business `NotFoundError` or an application error hierarchy.

Use these rules:

- **Expected application outcome:** return `Result`, for example invalid credentials, a requested resource not found, or a known unique constraint conflict.
- **Optional absence:** return `null` (or use an optional property) when absence is a normal observation without a use-case-specific meaning. A use case may turn that absence into its own `Err`.
- **Unexpected failure:** throw. Database availability, filesystem errors, malformed persisted data, broken invariants, and unexpected external-service failures are not recoverable application outcomes.
- **HTTP pipeline failure:** AdonisJS exceptions may be used under `app`, where controllers and middleware adapt application outcomes to HTTP. They must not be imported into `src`.
- **HTTP validation:** request shape and field validation remain in the delivery layer when they are specific to an HTTP form.

Repositories return a nullable entity when they only observe that a record is absent, including an update that affects no record. A use case may give that absence application meaning through its own `Result`. A repository may expose a `Result` when it owns an expected persistence outcome such as a known unique constraint conflict. Repositories never choose an HTTP status.

Controllers must handle every error variant explicitly. A new variant must therefore require a delivery decision instead of silently falling through the global exception handler.

## End-to-end example

An application action declares the outcomes useful to its caller:

```ts
type CreateTagError =
	| { type: 'tag_name_already_exists' }
	| { type: 'tag_slug_already_exists' };

async execute(input: CreateTagInput): Promise<Result<Tag, CreateTagError>> {
	return this.repository.create(input);
}
```

Here `CreateTagError` aliases the repository's uniqueness-conflict union because the action exposes exactly the same outcomes without adding semantics. It must not rebuild identical variants one by one. If an action needs to combine, hide, or reinterpret repository outcomes, it instead owns and constructs its own error union.

The controller owns the delivery semantics:

```ts
const result = await this.createTag.execute(payload);

if (!result.ok) {
	switch (result.error.type) {
		case 'tag_name_already_exists':
			session.flash('inputErrorsBag', { name: ['Ce nom est déjà utilisé.'] });
			break;
		case 'tag_slug_already_exists':
			session.flash('inputErrorsBag', { slug: ['Ce slug est déjà utilisé.'] });
			break;
		default: {
			const exhaustive: never = result.error;
			return exhaustive;
		}
	}

	return response.redirect().back();
}
```

By contrast, `UserRepository.findUserByEmail()` and `TagRepository.update()` return an entity or `null`: each repository only observes absence. `AuthService.attempt()` gives a missing User application meaning by returning `Err<{ type: 'invalid_credentials' }>`. A future Tag update use case may likewise translate `null` into its own local error when a production consumer needs that distinction. A database connection failure still throws.

## Initial adoption note

The initial migration makes three previously implicit absence cases explicit: an unknown Category filter, an unknown Paste, and an update targeting a missing Article now produce the same HTTP 404 contract as other missing public or administrative resources. Before this decision, the first two leaked a Kysely `NoResultError` as a 500, while the Article update could redirect as though it had succeeded. These are intentional corrections to accidental, previously untested behavior and require explicit review with the rest of the migration.

## Consequences

- The global handler only handles framework and unexpected exceptions; it does not map application error types.
- Public behavior is visible at each controller and can be tested independently from the application contract.
- Some similar-looking absences intentionally use different representations depending on responsibility.
- Adding an expected error requires updating both the local union and every delivery adapter that consumes it.
