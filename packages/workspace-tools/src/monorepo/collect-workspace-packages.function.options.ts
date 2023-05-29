import { normalizeRegExpLikeToRegExp } from '@alexaegis/common';
import {
	normalizeGetRootPackageJsonOptions,
	type GetRootPackageJsonOptions,
	type NormalizedGetRootPackageJsonOptions,
} from '../npm/get-root-package-json.function.options.js';

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
	 * When defined, only return packages matching one of the filters.
	 * When empty or undefined, it's not doing anything.
	 *
	 * @defaultValue undefined
	 */
	filter?: string[] | undefined;

	/**
	 * Return only those packages that list these dependencies. When it's not
	 * defined or is an empty array, it will not perform such filtering.
	 *
	 * @defaultValue []
	 */
	dependencyCriteria?: (string | RegExp)[];

	/**
	 * Return only those packages that list these keywords. When it's not
	 * defined or is an empty array, it will not perform such filtering.
	 *
	 * @defaultValue []
	 */
	keywordCriteria?: (string | RegExp)[];
}

export type CollectWorkspacePackagesOptions = CollectWorkspaceOnlyOptions &
	GetRootPackageJsonOptions;

export type NormalizedCollectWorkspacePackagesOptions = Required<
	Omit<CollectWorkspaceOnlyOptions, 'keywordCriteria' | 'dependencyCriteria'>
> & {
	dependencyCriteria: RegExp[];
	keywordCriteria: RegExp[];
} & NormalizedGetRootPackageJsonOptions;

export const normalizeCollectWorkspacePackagesOptions = (
	options?: CollectWorkspacePackagesOptions
): NormalizedCollectWorkspacePackagesOptions => {
	return {
		...normalizeGetRootPackageJsonOptions(options),
		onlyWorkspaceRoot: options?.onlyWorkspaceRoot ?? false,
		skipWorkspaceRoot: options?.skipWorkspaceRoot ?? false,
		dependencyCriteria: options?.dependencyCriteria?.map(normalizeRegExpLikeToRegExp) ?? [],
		keywordCriteria: options?.keywordCriteria?.map(normalizeRegExpLikeToRegExp) ?? [],
		filter: options?.filter ?? [],
	};
};
