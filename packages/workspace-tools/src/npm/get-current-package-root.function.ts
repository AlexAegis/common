import { collectPackageJsonPathsUpDirectoryTree } from './collect-package-json-paths-up-directory-tree.function.js';

/**
 * Returns the nearest folder where a package.json file is present
 *
 * (If you're searching for the farthest, use the getCurrentPackageRoot function)
 *
 * @param cwd @default process.cwd()
 * @returns
 */
export const getCurrentPackageRoot = (cwd: string = process.cwd()): string | undefined => {
	return collectPackageJsonPathsUpDirectoryTree({ cwd, maxPackages: 1 })[0];
};
