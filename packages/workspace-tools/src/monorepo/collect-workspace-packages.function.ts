import { readJson, readYaml } from '@alexaegis/fs';
import { globby } from 'globby';
import { join } from 'node:path';
import {
	NODE_MODULES_DIRECTORY_NAME,
	PackageJson,
	PACKAGE_JSON_NAME,
	PnpmWorkspaceYaml,
	PNPM_WORKSPACE_FILE_NAME,
} from '../const/package-json.interface.js';

import { getWorkspaceRoot } from '../npm/get-workspace-root.function.js';
import {
	CollectWorkspacePackagesOptions,
	normalizeCollectWorkspacePackagesOptions,
} from './collect-workspace-packages.function.options.js';
import type { WorkspacePackage } from './workspace-package.interface.js';

export const collectWorkspacePackages = async (
	rawOptions?: CollectWorkspacePackagesOptions
): Promise<WorkspacePackage[]> => {
	const options = normalizeCollectWorkspacePackagesOptions(rawOptions);

	const rootWorkspace = getWorkspaceRoot(options.cwd);
	if (!rootWorkspace) {
		return [];
	}

	const packageJson = await readJson<PackageJson>(join(rootWorkspace, PACKAGE_JSON_NAME));

	if (!packageJson) {
		return [];
	}

	const rootPackage: WorkspacePackage = {
		path: rootWorkspace,
		packageJson,
	};

	const pnpmWorkspace = await readYaml<PnpmWorkspaceYaml>(
		join(rootWorkspace, PNPM_WORKSPACE_FILE_NAME)
	);

	let workspaces: string[] = packageJson.workspaces ?? [];

	if (pnpmWorkspace?.packages) {
		workspaces = [...workspaces, ...pnpmWorkspace.packages];
	}

	let result: WorkspacePackage[] = [];

	if (workspaces.length > 0) {
		const paths = await globby(workspaces, {
			gitignore: true,
			onlyDirectories: true,
			ignore: [NODE_MODULES_DIRECTORY_NAME],
			absolute: true,
			cwd: rootWorkspace,
		});

		const potentialSubPackages = await Promise.all(
			paths.map((path) =>
				readJson<PackageJson>(join(path, PACKAGE_JSON_NAME)).then((packageJson) => ({
					packageJson,
					path,
				}))
			)
		);

		const subPackages = potentialSubPackages.filter(
			(relativePackage): relativePackage is WorkspacePackage => !!relativePackage.packageJson
		);

		if (!options.onlyWorkspaceRoot) {
			result.push(...subPackages);
		}
	}

	if (!options.skipWorkspaceRoot) {
		result.unshift(rootPackage);
	}

	if (options.dependencyCriteria.length > 0) {
		result = result.filter((relativePackage) => {
			const packageDependencies = new Set([
				...Object.keys(relativePackage.packageJson.dependencies ?? {}),
				...Object.keys(relativePackage.packageJson.devDependencies ?? {}),
			]);

			return options.dependencyCriteria.every((dependency) =>
				packageDependencies.has(dependency)
			);
		});
	}

	return result;
};
