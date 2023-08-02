import type { Defined } from '@alexaegis/common';
import {
	normalizeCwdOption,
	normalizeDirectoryDepthOption,
	type CwdOption,
	type DirectoryDepthOption,
} from '@alexaegis/fs';

export type CollectPackageJsonPathsUpDirectoryTreeOptions = CwdOption &
	DirectoryDepthOption & {
		/**
		 * How many packages it should find at most
		 *
		 * Normally workspaces only have 2 layer of packages, so by default
		 * I assume a monorepo. You can change this to 1 if using a
		 * single-project repo, or to something larger like `Infinity` if you
		 * have something more unique. For example searching from inside the
		 * node_modules folder will definitely need you to find more than
		 * 2 package.json files. But normally your `cwd` won't be inside there.
		 *
		 * @default 2
		 */
		maxPackages?: number | undefined;
	};

export type NormalizedCollectPackageJsonPathsUpDirectoryTreeOptions =
	Defined<CollectPackageJsonPathsUpDirectoryTreeOptions>;

export const normalizeCollectPackageJsonPathsUpDirectoryTreeOptions = (
	options?: CollectPackageJsonPathsUpDirectoryTreeOptions,
): NormalizedCollectPackageJsonPathsUpDirectoryTreeOptions => {
	return {
		...normalizeCwdOption(options),
		...normalizeDirectoryDepthOption(options),
		maxPackages: options?.maxPackages ?? 2,
	};
};
