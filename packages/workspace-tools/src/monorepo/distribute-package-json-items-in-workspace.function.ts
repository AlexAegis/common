import { deepMerge, fillObjectWithTemplateVariables, sortObject } from '@alexaegis/common';
import { writeJson } from '@alexaegis/fs';
import type { Dependency } from '@schemastore/package';
import { join, relative } from 'node:path';
import { getWorkspaceRoot } from '../npm/get-workspace-root.function.js';
import {
	getPackageJsonTemplateVariables,
	type PackageJsonTemplateVariableNames,
} from '../package-json/get-package-json-template-variables.function.js';
import { mergeDependencies } from '../package-json/merge-dependencies.function.js';
import {
	PACKAGE_JSON_DEPENDENCY_FIELDS,
	PACKAGE_JSON_NAME,
	type PackageJson,
} from '../package-json/package-json.interface.js';
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

			const targetPackageJson = PACKAGE_JSON_DEPENDENCY_FIELDS.reduce(
				(acc, dependencyFieldKey) => {
					if (packageJsonUpdates[dependencyFieldKey]) {
						acc[dependencyFieldKey] = mergeDependencies(
							target.packageJson[dependencyFieldKey] as Dependency,
							packageJsonUpdates[dependencyFieldKey] as Dependency
						);
					}

					return acc;
				},
				deepMerge(structuredClone(target.packageJson), packageJsonUpdates)
			);

			return writeJson(
				sortObject(targetPackageJson, options.sortingPreference),
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
