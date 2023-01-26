import { CwdOption, normalizeCwdOption } from '@alexaegis/fs';

export interface CollectWorkspacePackagesOptions extends CwdOption {
	/**
	 * Only return the root workspace package
	 *
	 * @default false
	 */
	onlyWorkspaceRoot?: boolean;

	/**
	 * Skip the root workspace package itself
	 *
	 * @default false
	 */
	skipWorkspaceRoot?: boolean;
}

export type NormalizedCollectWorkspacePackagesOptions = Required<CollectWorkspacePackagesOptions>;

export const normalizeCollectWorkspacePackagesOptions = (
	options?: CollectWorkspacePackagesOptions
): NormalizedCollectWorkspacePackagesOptions => {
	return {
		...normalizeCwdOption(options),
		onlyWorkspaceRoot: options?.onlyWorkspaceRoot ?? false,
		skipWorkspaceRoot: options?.skipWorkspaceRoot ?? false,
	};
};
