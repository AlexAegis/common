import { dry } from '@alexaegis/common';
import { globby } from 'globby';
import { rm } from 'node:fs/promises';
import { relative } from 'node:path';
import { NODE_MODULES_DIRECTORY_NAME } from '../package-json/package-json.interface.js';
import { collectWorkspacePackages } from './collect-workspace-packages.function.js';
import {
	DistributeInWorkspaceOptions,
	normalizeDistributeInWorkspaceOptions,
} from './distribute-in-workspace.options.js';

export const removeInWorkspace = async (
	packageRelativeGlobs: string | string[],
	rawOptions?: DistributeInWorkspaceOptions
): Promise<void> => {
	const options = normalizeDistributeInWorkspaceOptions(rawOptions);

	const targetPackages = await collectWorkspacePackages(options);

	options.logger.info(
		`packages to check:\n\t${targetPackages
			.map((packageJson) => './' + relative(options.cwd, packageJson.path))
			.join('\n\t')}`
	);

	const pathsToDelete = await Promise.all(
		targetPackages.map((target) =>
			globby(packageRelativeGlobs, {
				cwd: target.path,
				ignore: [NODE_MODULES_DIRECTORY_NAME],
				absolute: true,
				gitignore: true,
			})
		)
	);

	await Promise.all(
		pathsToDelete.flat().map((pathToDelete) => {
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
