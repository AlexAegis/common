import type { CollectWorkspacePackagesOptions } from '@alexaegis/workspace-tools';
import { readFile } from 'node:fs/promises';
import { collectLcovReportPaths } from './collect-lcov-report-paths.function.js';

export const mergeLcovReportsInWorkspace = async (
	rawOptions?: CollectWorkspacePackagesOptions
): Promise<string> => {
	const lcovPaths = await collectLcovReportPaths(rawOptions);

	const allLcovReports = await Promise.all(
		lcovPaths.map((path) =>
			readFile(path, {
				encoding: 'utf8',
			})
		)
	);

	return allLcovReports.join('\n');
};
