import {
	collectWorkspacePackages,
	CollectWorkspacePackagesOptions,
	getWorkspaceRoot,
	NODE_MODULES_DIRECTORY_NAME,
} from '@alexaegis/workspace-tools';
import { globby } from 'globby';

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
