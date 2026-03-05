# Changesets

This directory contains pending changesets — descriptions of changes that will be included in the next release.

## Workflow

**During development**, after making changes to `packages/@ui` or `packages/registry`:

```sh
pnpm changeset
```

This opens an interactive prompt where you select which packages changed and whether it's a `patch`, `minor`, or `major` bump. A markdown file is created in this directory — commit it alongside your code.

**To release**, run from the monorepo root:

```sh
pnpm release
```

This script:
1. Reads all pending changesets and bumps versions accordingly
2. Generates/updates `CHANGELOG.md` in each package
3. Builds all packages
4. Syncs consumer references to the new version numbers
5. Publishes to npm
6. Updates the lockfile
7. Commits and pushes everything (including version tags)

## Version bumping rules

- `patch` — bug fixes, dependency updates, small tweaks
- `minor` — new components, new features (backwards compatible)
- `major` — breaking changes to component APIs

`ui-lab-components` and `ui-lab-registry` are **fixed** — they always release at the same version number.
`ui-lab-mcp` releases independently.
