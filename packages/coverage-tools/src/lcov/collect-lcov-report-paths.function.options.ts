import {
	CollectWorkspacePackagesOptions,
	normalizeCollectWorkspacePackagesOptions,
} from '@alexaegis/workspace-tools';

export type CollectLcovReportPathsOptions = Omit<
	CollectWorkspacePackagesOptions,
	'onlyWorkspaceRoot' | 'skipWorkspaceRoot'
>;

export type NormalizedCollectLcovReportPathsOptions = Required<CollectLcovReportPathsOptions>;

export const normalizeCollectLcovReportPathsOptions = (
	options?: CollectLcovReportPathsOptions
): NormalizedCollectLcovReportPathsOptions => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { onlyWorkspaceRoot, skipWorkspaceRoot, ...rest } =
		normalizeCollectWorkspacePackagesOptions(options);

	return rest;
};
