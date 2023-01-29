import {
	DistributeInWorkspaceOptions,
	normalizeDistributeInWorkspaceOptions,
} from './distribute-in-workspace.options.js';

export interface DistributeFileInWorkspaceOptions extends DistributeInWorkspaceOptions {
	/**
	 * Instead of copying file, just symlink them.
	 *
	 * @default false
	 */
	symlinkInsteadOfCopy?: boolean;
}

export type NormalizedDistributeFileInWorkspaceOptions = Required<DistributeFileInWorkspaceOptions>;

export const normalizeDistributeFileInWorkspaceOptions = (
	options?: DistributeFileInWorkspaceOptions
): NormalizedDistributeFileInWorkspaceOptions => {
	return {
		...normalizeDistributeInWorkspaceOptions(options),
		symlinkInsteadOfCopy: options?.symlinkInsteadOfCopy ?? false,
	};
};
