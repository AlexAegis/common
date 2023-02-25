import { readJson, readYaml } from '@alexaegis/fs';
import { globby } from 'globby';
import { join } from 'node:path';
import {
	NODE_MODULES_DIRECTORY_NAME,
	PackageJson,
	PACKAGE_JSON_NAME,
	PnpmWorkspaceYaml,
	PNPM_WORKSPACE_FILE_NAME,
} from '../package-json/package-json.interface.js';

import { asyncFilterMap } from '@alexaegis/common';
import { getWorkspaceRoot } from '../npm/get-workspace-root.function.js';
import { normalizePackageJsonWorkspacesField } from '../npm/normalize-package-json-workspaces-field.function.js';
import type { WorkspacePackage } from '../package-json/workspace-package.interface.js';
import {
	CollectWorkspacePackagesOptions,
	normalizeCollectWorkspacePackagesOptions,
} from './collect-workspace-packages.function.options.js';

export const collectWorkspacePackages = async (
	rawOptions?: CollectWorkspacePackagesOptions
): Promise<WorkspacePackage[]> => {
	const options = normalizeCollectWorkspacePackagesOptions(rawOptions);

	const rootWorkspace = getWorkspaceRoot(options.cwd);
	if (!rootWorkspace) {
		options.logger.error('No package json was found! Cannot collect workspace packages!');

		return [];
	}

	const packageJsonPath = join(rootWorkspace, PACKAGE_JSON_NAME);
	const packageJson = await readJson<PackageJson>(packageJsonPath).catch(() => undefined);

	if (!packageJson) {
		options.logger.error('Failed to read packageJson!', packageJsonPath);
		return [];
	}

	const rootPackage: WorkspacePackage = {
		path: rootWorkspace,
		packageJson,
	};

	const pnpmWorkspace = await readYaml<PnpmWorkspaceYaml>(
		join(rootWorkspace, PNPM_WORKSPACE_FILE_NAME)
	);

	let workspaces = normalizePackageJsonWorkspacesField(packageJson.workspaces);

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

		const subPackages = await asyncFilterMap(paths, (path) =>
			readJson<PackageJson>(join(path, PACKAGE_JSON_NAME))
				.catch(() => undefined)
				.then((packageJson) =>
					packageJson
						? {
								packageJson,
								path,
						  }
						: undefined
				)
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
			const packageDependencies = [
				...Object.keys(relativePackage.packageJson.dependencies ?? {}),
				...Object.keys(relativePackage.packageJson.devDependencies ?? {}),
			];

			return options.dependencyCriteria.every((dependencyCriteria) =>
				packageDependencies.some((dependency) => dependencyCriteria.test(dependency))
			);
		});
	}

	if (options.keywordCriteria.length > 0) {
		result = result.filter((relativePackage) => {
			const keywords = relativePackage.packageJson.keywords;

			return (
				keywords &&
				options.keywordCriteria.every((keywordCriteria) =>
					keywords.some((keyword) => keywordCriteria.test(keyword))
				)
			);
		});
	}

	return result;
};
