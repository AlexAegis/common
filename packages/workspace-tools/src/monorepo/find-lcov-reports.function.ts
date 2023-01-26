import { globby } from 'globby';
import { NODE_MODULES_DIRECTORY_NAME } from '../const/package-json.interface.js';
import { getWorkspaceRoot } from '../npm/get-workspace-root.function.js';
import { collectWorkspacePackages } from './collect-workspace-packages.function.js';
import type { CollectWorkspacePackagesOptions } from './collect-workspace-packages.function.options.js';

export const LCOV_INFO_FILE_NAME = 'lcov.info';

export const findLcovReportPaths = async (
	rawOptions?: CollectWorkspacePackagesOptions
): Promise<string[]> => {
	const workspaceRoot = await getWorkspaceRoot(rawOptions?.cwd);
	const workspacePackages = await collectWorkspacePackages({
		...rawOptions,
		skipWorkspaceRoot: true,
	});

	const lcovPathResults = await Promise.all(
		workspacePackages.map((workspacePackage) =>
			globby([`${workspacePackage.path}/**/${LCOV_INFO_FILE_NAME}`], {
				cwd: workspaceRoot,
				ignore: [`**/${NODE_MODULES_DIRECTORY_NAME}`],
			})
		)
	);

	return lcovPathResults.flat();
};
