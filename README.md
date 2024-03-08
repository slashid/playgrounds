# /id UI

This monorepo hosts the `/id` internal component library and projects built on top of it.

## Setup

Install `pnpm` globally. Then run `pnpm install`. Project is managed by `turborepo`.

### Environment variables

Check the `.env.example` file for the required environment variables.

## Development

Run `pnpm dev --filter [ui | customer-playground | organization-switching]` to start individual projects in dev mode.

## Known issues

### `pnpm` and `eslint` cascading

`eslint` has trouble uniquely identifying the `@typescript-eslint` package because both the root level `eslint` config and the `@remix-run/eslint-config` use the same peer dependency which somehow ends up installing twice. For the time being we removed the root config and set up individual `eslint` configs that do not cascade.

Reference:

- [pull request](https://github.com/slashid/ui/pull/7) that removes the root config
- [pnpm issue](https://github.com/pnpm/pnpm/issues/4619) that explaines the problem
