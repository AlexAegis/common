import { deepMerge, fillObjectWithTemplateVariables, sortObject } from '@alexaegis/common';
import { writeJson } from '@alexaegis/fs';
import { join, relative } from 'node:path';
import { getWorkspaceRoot } from '../index.js';
import {
	getPackageJsonTemplateVariables,
	type PackageJsonTemplateVariableNames,
} from '../package-json/get-package-json-template-variables.function.js';
import { PACKAGE_JSON_NAME, type PackageJson } from '../package-json/package-json.interface.js';
import { collectWorkspacePackages } from './collect-workspace-packages.function.js';
import {
	normalizeDistributePackageJsonItemsInWorkspaceOptions,
	type DistributePackageJsonItemsInWorkspaceOptions,
} from './distribute-package-json-items-in-workspace.function.options.js';

/**
 * Deeply merges updates into the packageJson files of a workspace.
 * Can be used to force dependencies or other keys to be present in source
 * packageJson files.
 *
 * Do not use it concurrently with other packageJson edits! Information can be
 * lost as they both edit the same files!
 */
export const distributePackageJsonItemsInWorkspace = async (
	unprocessedPackageJsonUpdates: Partial<PackageJson>,
	rawOptions?: DistributePackageJsonItemsInWorkspaceOptions
): Promise<void> => {
	const options = normalizeDistributePackageJsonItemsInWorkspaceOptions(rawOptions);
	const workspaceRoot = getWorkspaceRoot(options.cwd);

	if (!workspaceRoot) {
		options.logger.error("can't distribute packageJson updates, not in a workspace!");
		return;
	}

	const targetPackages = await collectWorkspacePackages(options);

	options.logger.info(
		`packages to check:\n\t${targetPackages
			.map((packageJson) => './' + relative(options.cwd, packageJson.path))
			.join('\n\t')}`
	);

	await Promise.all(
		targetPackages.map((target) => {
			const templateVariables = getPackageJsonTemplateVariables(target.packageJson);
			templateVariables['relativePathFromPackageToRoot'] =
				relative(target.path, workspaceRoot) || '.';

			const packageJsonUpdates =
				fillObjectWithTemplateVariables<PackageJsonTemplateVariableNames>(
					unprocessedPackageJsonUpdates,
					templateVariables
				);

			return writeJson(
				sortObject(
					deepMerge(target.packageJson, packageJsonUpdates),
					options.sortingPreference
				),
				join(target.path, PACKAGE_JSON_NAME),
				{
					dry: options.dry,
				}
			)
				.then(() => {
					options.logger.info(
						`writing ${target.path}'s new content:`,
						packageJsonUpdates
					);
				})
				.catch((error: string) => {
					options.logger.error(
						`can't write updates to ${join(
							target.path,
							PACKAGE_JSON_NAME
						)}, error happened: ${error}`
					);
				});
		})
	);
};
