import { existsSync } from 'node:fs';
import { join, normalize } from 'node:path';
import { PACKAGE_JSON_NAME } from '../package-json/package-json.interface.js';
import {
	normalizeCollectPackageJsonPathsUpDirectoryTreeOptions,
	type CollectPackageJsonPathsUpDirectoryTreeOptions,
	type NormalizedCollectPackageJsonPathsUpDirectoryTreeOptions,
} from './collect-package-json-paths-up-directory-tree.function.options.js';

export const collectPackageJsonPathsUpDirectoryTree = (
	rawOptions?: CollectPackageJsonPathsUpDirectoryTreeOptions,
): string[] => {
	const options = normalizeCollectPackageJsonPathsUpDirectoryTreeOptions(rawOptions);
	return collectPackageJsonPathsUpDirectoryTreeInternal(options);
};

const collectPackageJsonPathsUpDirectoryTreeInternal = (
	options: NormalizedCollectPackageJsonPathsUpDirectoryTreeOptions,
	collection: string[] = [],
): string[] => {
	const path = normalize(options.cwd);
	if (collection.length < options.maxPackages && existsSync(join(path, PACKAGE_JSON_NAME))) {
		collection.unshift(path);
	}

	const parentPath = join(path, '..');
	if (parentPath !== path && options.depth > 0 && collection.length < options.maxPackages) {
		return collectPackageJsonPathsUpDirectoryTreeInternal(
			{ ...options, depth: options.depth - 1, cwd: parentPath },
			collection,
		);
	}

	return collection;
};
