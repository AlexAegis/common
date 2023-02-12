import { CwdOption, normalizeCwdOption, NormalizedCwdOption } from '@alexaegis/fs';
import { LoggerOption, NormalizedLoggerOption, normalizeLoggerOption } from '@alexaegis/logging';

interface WorkspaceOnlyCollectWorkspaceOnlyOptions extends CollectWorkspaceOnlyOptions {
	onlyWorkspaceRoot: true;
}

interface CollectWorkspaceOnlyOptions {
	/**
	 * Only return the root workspace package
	 *
	 * @defaultValue false
	 */
	onlyWorkspaceRoot?: boolean;

	/**
	 * Skip the root workspace package itself
	 *
	 * @defaultValue false
	 */
	skipWorkspaceRoot?: boolean;

	/**
	 * Return only those packages that list these dependencies. When it's not
	 * defined or is an empty array, it will not perform such filtering.
	 *
	 * @defaultValue []
	 */
	dependencyCriteria?: string[];

	/**
	 * Return only those packages that list these keywords. When it's not
	 * defined or is an empty array, it will not perform such filtering.
	 *
	 * @defaultValue []
	 */
	keywordCriteria?: string[];
}

export type CollectWorkspacePackagesOptions = CollectWorkspaceOnlyOptions &
	CwdOption &
	LoggerOption;

export type NormalizedCollectWorkspacePackagesOptions = Required<CollectWorkspaceOnlyOptions> &
	NormalizedCwdOption &
	NormalizedLoggerOption;

export const normalizeCollectWorkspacePackagesOptions = (
	options?: CollectWorkspacePackagesOptions
): NormalizedCollectWorkspacePackagesOptions => {
	return {
		...normalizeCwdOption(options),
		...normalizeLoggerOption(options),
		onlyWorkspaceRoot: options?.onlyWorkspaceRoot ?? false,
		skipWorkspaceRoot: options?.skipWorkspaceRoot ?? false,
		dependencyCriteria: options?.dependencyCriteria ?? [],
		keywordCriteria: options?.keywordCriteria ?? [],
	};
};
