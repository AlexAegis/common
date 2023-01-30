import { deepMerge } from '@alexaegis/common';
import { writeJson } from '@alexaegis/fs';
import { join, relative } from 'node:path';
import { PACKAGE_JSON_NAME } from '../const/package-json.interface.js';
import { collectWorkspacePackages } from './collect-workspace-packages.function.js';
import {
	DistributeInWorkspaceOptions,
	normalizeDistributeInWorkspaceOptions,
} from './distribute-in-workspace.options.js';

export const distributePackageJsonItemsInWorkspace = async (
	packageJsonUpdates: Record<string | number, unknown>,
	rawOptions?: DistributeInWorkspaceOptions
): Promise<void> => {
	const options = normalizeDistributeInWorkspaceOptions(rawOptions);

	const targetPackages = await collectWorkspacePackages(options);

	options.logger.log(
		`packages to check:\n\t${targetPackages
			.map((packageJson) => './' + relative(options.cwd, packageJson.path))
			.join('\n\t')}`
	);

	await Promise.all(
		targetPackages.map((target) =>
			writeJson(
				deepMerge(target.packageJson, packageJsonUpdates),
				join(target.path, PACKAGE_JSON_NAME),
				{
					dry: options.dry,
				}
			)
				.then(() => {
					options.logger.log(
						`writing ${target.path}'s new content: ${JSON.stringify(
							target.packageJson
						)}`
					);
				})
				.catch((error: string) => {
					options.logger.error(
						`can't link ${packageJsonUpdates}, error happened: ${error}`
					);
				})
		)
	);
};
