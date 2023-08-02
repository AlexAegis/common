import { collectPackageJsonPathsUpDirectoryTree } from './collect-package-json-paths-up-directory-tree.function.js';
import type { CollectPackageJsonPathsUpDirectoryTreeOptions } from './collect-package-json-paths-up-directory-tree.function.options.js';

/**
 * Returns the furthest folder where a package.json file is present
 *
 * (If you're searching for the nearest, use the getWorkspaceRoot function)
 *
 * @param cwd process.cwd()
 * @returns
 */
export const getWorkspaceRoot = (
	rawOptions?: CollectPackageJsonPathsUpDirectoryTreeOptions,
): string | undefined => {
	return collectPackageJsonPathsUpDirectoryTree(rawOptions)[0];
};
