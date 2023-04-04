import {
	normalizeDryOption,
	normalizeForceOption,
	type DryOption,
	type ForceOption,
	type NormalizedDryOption,
	type NormalizedForceOption,
} from '@alexaegis/common';
import {
	normalizeCollectWorkspacePackagesOptions,
	type CollectWorkspacePackagesOptions,
	type NormalizedCollectWorkspacePackagesOptions,
} from './collect-workspace-packages.function.options.js';

export type DistributeInWorkspaceOptions = CollectWorkspacePackagesOptions &
	DryOption &
	ForceOption;

export type NormalizedDistributeInWorkspaceOptions = NormalizedCollectWorkspacePackagesOptions &
	NormalizedDryOption &
	NormalizedForceOption;

export const normalizeDistributeInWorkspaceOptions = (
	options?: DistributeInWorkspaceOptions
): NormalizedDistributeInWorkspaceOptions => {
	return {
		...normalizeCollectWorkspacePackagesOptions(options),
		...normalizeDryOption(options),
		...normalizeForceOption(options),
		onlyWorkspaceRoot: options?.onlyWorkspaceRoot ?? false,
		skipWorkspaceRoot: options?.skipWorkspaceRoot ?? false,
	};
};
