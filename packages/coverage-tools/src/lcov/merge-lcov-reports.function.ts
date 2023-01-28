import type { CollectWorkspacePackagesOptions } from '@alexaegis/workspace-tools';
import { readFile } from 'node:fs/promises';
import { findLcovReportPaths } from './find-lcov-reports.function.js';

export const mergeLcovReports = async (
	rawOptions?: CollectWorkspacePackagesOptions
): Promise<string> => {
	const lcovPaths = await findLcovReportPaths(rawOptions);

	const allLcovReports = await Promise.all(
		lcovPaths.map((path) =>
			readFile(path, {
				encoding: 'utf8',
			})
		)
	);

	return allLcovReports.join('\n');
};
