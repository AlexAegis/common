import {
	normalizeDryOption,
	normalizeSafeOption,
	type ForceOption,
	type NormalizedDryOption,
	type NormalizedSafeOption,
	type SafeOption,
} from '@alexaegis/common';
import { normalizeCollectWorkspacePackagesOptions } from './collect-workspace-packages.function.options.js';
import type { DistributeInWorkspaceOptions } from './distribute-in-workspace.options.js';

export type RemoveFilesInWorkspaceOptions = Omit<DistributeInWorkspaceOptions, keyof ForceOption> &
	SafeOption;

export type NormalizedRemoveFilesInWorkspaceOptions = Required<RemoveFilesInWorkspaceOptions> &
	NormalizedDryOption &
	NormalizedSafeOption;

export const normalizeRemoveFilesInWorkspaceOptions = (
	options?: RemoveFilesInWorkspaceOptions
): NormalizedRemoveFilesInWorkspaceOptions => {
	return {
		...normalizeCollectWorkspacePackagesOptions(options),
		...normalizeDryOption(options),
		...normalizeSafeOption(options),
		onlyWorkspaceRoot: options?.onlyWorkspaceRoot ?? false,
		skipWorkspaceRoot: options?.skipWorkspaceRoot ?? false,
		packageJsonMatcher: options?.packageJsonMatcher,
	};
};
