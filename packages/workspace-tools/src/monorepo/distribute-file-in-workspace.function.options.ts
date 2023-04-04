import {
	normalizeDistributeInWorkspaceOptions,
	type DistributeInWorkspaceOptions,
} from './distribute-in-workspace.options.js';

export type Transformer = (content: string) => string;

interface DistributeFileInWorkspaceOnlyOptions {
	/**
	 * Instead of copying file, just symlink them.
	 *
	 * @defaultValue false
	 */
	symlinkInsteadOfCopy?: boolean;

	/**
	 * Should the copied file be marked as executable by the current user
	 *
	 * Use this when distributing scripts
	 *
	 * @defaultValue false
	 */
	markAsExecutable?: boolean;

	/**
	 * Define template variables in addition of the already provided ones
	 *
	 * @defaultValue {}
	 */
	templateVariables?: Record<string, string>;

	/**
	 * Transform the file as it being distributed. It runs BEFORE subtituting
	 * variables so you can add additional ones. Including the ones defined in
	 * templateVariables.
	 *
	 * @defaultValue []
	 */
	transformers?: Transformer[];
}

export type DistributeFileInWorkspaceOptions = DistributeFileInWorkspaceOnlyOptions &
	DistributeInWorkspaceOptions;

export type NormalizedDistributeFileInWorkspaceOptions = Required<DistributeFileInWorkspaceOptions>;

export const normalizeDistributeFileInWorkspaceOptions = (
	options?: DistributeFileInWorkspaceOptions
): NormalizedDistributeFileInWorkspaceOptions => {
	return {
		...normalizeDistributeInWorkspaceOptions(options),
		symlinkInsteadOfCopy: options?.symlinkInsteadOfCopy ?? false,
		markAsExecutable: options?.markAsExecutable ?? false,
		templateVariables: options?.templateVariables ?? {},
		transformers: options?.transformers ?? [],
	};
};
