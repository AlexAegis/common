import type { LoggerOption } from '@alexaegis/logging';
import type { DistributeFileInWorkspaceOptions } from '@alexaegis/workspace-tools';
import type { Argv } from 'yargs';
import { yargsForCollectWorkspacePackagesOptions } from './collect-workspace-packages.yargs.js';

/**
 * @deprecated moved from the cli to the plugins to decide
 */
export const yargsForDistributeInWorkspaceOptions = <T>(
	yargs: Argv<T>
): Argv<T & Omit<DistributeFileInWorkspaceOptions, keyof LoggerOption>> => {
	return yargsForCollectWorkspacePackagesOptions(yargs).option('symlinkInsteadOfCopy', {
		boolean: true,
		default: false,
		description: 'Instead of copying files, just symlink them.',
	});
};
