import { asyncFilter, asyncFilterMap, dry } from '@alexaegis/common';
import { globby } from 'globby';
import { rm } from 'node:fs/promises';
import { relative } from 'node:path';
import { NODE_MODULES_DIRECTORY_NAME } from '../package-json/package-json.interface.js';
import { collectWorkspacePackages } from './collect-workspace-packages.function.js';
import { isDistributedFile } from './is-distributed-file.function.js';
import {
	normalizeRemoveFilesInWorkspaceOptions,
	RemoveFilesInWorkspaceOptions,
} from './remove-files-in-workspace.function.options.js';

export const removeFilesInWorkspace = async (
	packageRelativeGlobs: string | string[],
	rawOptions?: RemoveFilesInWorkspaceOptions
): Promise<void> => {
	const options = normalizeRemoveFilesInWorkspaceOptions(rawOptions);

	const targetPackages = await collectWorkspacePackages(options);

	options.logger.info(
		`packages to check:\n\t${targetPackages
			.map((packageJson) => './' + relative(options.cwd, packageJson.path))
			.join('\n\t')}`
	);

	const pathsToDelete = await asyncFilterMap(targetPackages, (target) =>
		globby(packageRelativeGlobs, {
			cwd: target.path,
			ignore: [NODE_MODULES_DIRECTORY_NAME],
			absolute: true,
			gitignore: true,
		})
	);

	const safePathsToDelete = options.safe
		? await asyncFilter(pathsToDelete.flat(), isDistributedFile)
		: pathsToDelete.flat();

	await Promise.allSettled(
		safePathsToDelete.map((pathToDelete) => {
			const dryRm = dry(options.dry, rm);

			return dryRm(pathToDelete, { recursive: true })
				.then(() => {
					options.logger.info(`removed ${pathToDelete}`);
				})
				.catch((error: string) => {
					options.logger.error(`can't remove ${pathToDelete}, error happened: ${error}`);
				});
		})
	);
};
