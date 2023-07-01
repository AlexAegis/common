# [common](https://github.com/AlexAegis/common)/

[![npm](https://img.shields.io/npm/v/@alexaegis/common/latest)](https://www.npmjs.com/package/@alexaegis/common)
[![ci](https://github.com/AlexAegis/common/actions/workflows/cicd.yml/badge.svg)](https://github.com/AlexAegis/common/actions/workflows/cicd.yml)
[![codacy](https://app.codacy.com/project/badge/Grade/402dd6d7fcbd4cde86fdf8e7d948fcde)](https://www.codacy.com/gh/AlexAegis/common/dashboard?utm_source=github.com&utm_medium=referral&utm_content=AlexAegis/common&utm_campaign=Badge_Grade)
[![codecov](https://codecov.io/gh/AlexAegis/common/branch/master/graph/badge.svg?token=kw8ZeoPbUh)](https://codecov.io/gh/AlexAegis/common)

Common functions and workspace tools for other projects.

## Packages

### [common](./packages/common/)

Common utility functions.

### [cli-tools](./packages/cli-tools/)

Common tools for creating cli applications like common `yargs` configs and
options.

### [coverage-tools](./packages/coverage-tools/)

Can find and merge lcov files in a workspace.

### [fs](./packages/fs/)

Common filesystem related utility functions.

### [logging](./packages/logging/)

A custom logging solution to log with context and with pretty colors.

### [workspace-tools](./packages/workspace-tools/)

Functions to allow interactions with `npm` and `pnpm` workspaces. File
distribution, `packageJson` editing across monorepos.

## First-party dependency constraints

This repository must not deploy artifacts that are dependent of other
first-party artifacts. The only first-party artifact it may depend on is
[js-tooling](https://github.com/AlexAegis/js-tooling/) and only for the tooling
setup.
