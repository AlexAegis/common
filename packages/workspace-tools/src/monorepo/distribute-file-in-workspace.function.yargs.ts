import type { LoggerOption } from '@alexaegis/logging';
import type { Argv } from 'yargs';
import { yargsForCollectWorkspacePackagesOptions } from './collect-workspace-packages.function.yargs.js';
import type { DistributeInWorkspaceOptions } from './distribute-in-workspace.options.js';

export type DistributeInWorkspaceOptionsArgs = Argv<
	Omit<DistributeInWorkspaceOptions, keyof LoggerOption>
>;

export const yargsForDistributeInWorkspaceOptions = (
	yargs: Argv
): DistributeInWorkspaceOptionsArgs => {
	return yargsForCollectWorkspacePackagesOptions(yargs).option('symlinkInsteadOfCopy', {
		boolean: true,
		default: false,
		description: 'Instead of copying file, just symlink them.',
	});
};
