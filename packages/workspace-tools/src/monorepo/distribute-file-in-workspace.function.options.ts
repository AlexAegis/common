import type { SomePartial } from '@alexaegis/common';
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

	/**
	 * This path will be used relative from the target. For example if you
	 * target the workspaceRoot, setting this to `.vscode` will put everything
	 * into that folder.
	 */
	relativeTargetDirectory?: string;
}

export type DistributeFileInWorkspaceOptions = DistributeFileInWorkspaceOnlyOptions &
	DistributeInWorkspaceOptions;

export type NormalizedDistributeFileInWorkspaceOptions = SomePartial<
	DistributeFileInWorkspaceOnlyOptions,
	'relativeTargetDirectory'
> &
	NormalizedDistributeInWorkspaceOptions;

export const normalizeDistributeFileInWorkspaceOptions = (
	options?: DistributeFileInWorkspaceOptions
): NormalizedDistributeFileInWorkspaceOptions => {
	return {
		...normalizeDistributeInWorkspaceOptions(options),
		symlinkInsteadOfCopy: options?.symlinkInsteadOfCopy ?? false,
		markAsExecutable: options?.markAsExecutable ?? false,
		relativeTargetDirectory: options?.relativeTargetDirectory,
	};
};
