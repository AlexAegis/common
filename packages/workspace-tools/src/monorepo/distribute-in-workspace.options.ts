import {
	DryOption,
	ForceOption,
	normalizeDryOption,
	normalizeForceOption,
} from '@alexaegis/common';
import { normalizeCwdOption } from '@alexaegis/fs';
import { LoggerOption, normalizeLoggerOption } from '@alexaegis/logging';
import type { CollectWorkspacePackagesOptions } from './collect-workspace-packages.function.options.js';

export type DistributeInWorkspaceOptions = DryOption &
	ForceOption &
	CollectWorkspacePackagesOptions &
	LoggerOption;

export type NormalizedDistributeInWorkspaceOptions = Required<DistributeInWorkspaceOptions>;

export const normalizeDistributeInWorkspaceOptions = (
	options?: DistributeInWorkspaceOptions
): NormalizedDistributeInWorkspaceOptions => {
	return {
		...normalizeCwdOption(options),
		...normalizeDryOption(options),
		...normalizeForceOption(options),
		...normalizeLoggerOption(options),
		dependencyCriteria: options?.dependencyCriteria ?? [],
		onlyWorkspaceRoot: options?.onlyWorkspaceRoot ?? false,
		skipWorkspaceRoot: options?.skipWorkspaceRoot ?? false,
	};
};
