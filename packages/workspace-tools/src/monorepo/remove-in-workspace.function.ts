import { dry } from '@alexaegis/common';
import { rm } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { collectWorkspacePackages } from './collect-workspace-packages.function.js';
import {
	DistributeInWorkspaceOptions,
	normalizeDistributeInWorkspaceOptions,
} from './distribute-in-workspace.options.js';

export const removeInWorkspace = async (
	relativePath: string,
	rawOptions?: DistributeInWorkspaceOptions
): Promise<void> => {
	const options = normalizeDistributeInWorkspaceOptions(rawOptions);

	const targetPackages = await collectWorkspacePackages(options);

	options.logger.info(
		`packages to check:\n\t${targetPackages
			.map((packageJson) => './' + relative(options.cwd, packageJson.path))
			.join('\n\t')}`
	);

	await Promise.all(
		targetPackages.map((target) => {
			const pathToBeDeleted = join(target.path, relativePath);
			const dryRm = dry(options.dry, rm);

			return dryRm(pathToBeDeleted, { recursive: true })
				.then(() => {
					options.logger.info(`removed ${pathToBeDeleted}`);
				})
				.catch((error: string) => {
					options.logger.error(
						`can't remove ${pathToBeDeleted}, error happened: ${error}`
					);
				});
		})
	);
};
