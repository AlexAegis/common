import {
	DistributeInWorkspaceOptions,
	NormalizedDistributeInWorkspaceOptions,
	normalizeDistributeInWorkspaceOptions,
} from './distribute-in-workspace.options.js';

interface DistributeFileInWorkspaceOnlyOptions {
	/**
	 * Instead of copying file, just symlink them.
	 *
	 * @default false
	 */
	symlinkInsteadOfCopy?: boolean;

	/**
	 * Should the copied file be marked as executable by the current user
	 *
	 * Use this when distributing scripts
	 *
	 * @default false
	 */
	markAsExecutable?: boolean;
}

export type DistributeFileInWorkspaceOptions = DistributeFileInWorkspaceOnlyOptions &
	DistributeInWorkspaceOptions;

export type NormalizedDistributeFileInWorkspaceOptions =
	Required<DistributeFileInWorkspaceOnlyOptions> & NormalizedDistributeInWorkspaceOptions;

export const normalizeDistributeFileInWorkspaceOptions = (
	options?: DistributeFileInWorkspaceOptions
): NormalizedDistributeFileInWorkspaceOptions => {
	return {
		...normalizeDistributeInWorkspaceOptions(options),
		symlinkInsteadOfCopy: options?.symlinkInsteadOfCopy ?? false,
		markAsExecutable: options?.markAsExecutable ?? false,
	};
};
