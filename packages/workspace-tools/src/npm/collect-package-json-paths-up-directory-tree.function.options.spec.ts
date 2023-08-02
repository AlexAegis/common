import { describe, expect, it, vi, type SpyInstance } from 'vitest';
import {
	normalizeCollectPackageJsonPathsUpDirectoryTreeOptions,
	type NormalizedCollectPackageJsonPathsUpDirectoryTreeOptions,
} from './collect-package-json-paths-up-directory-tree.function.options.js';

export const mockProcessCwdValue = '/foo';

export const mockProcessCwd = (): SpyInstance => {
	return vi.spyOn(process, 'cwd').mockReturnValue(mockProcessCwdValue);
};

describe('normalizeDepthOption', () => {
	it('should default Infinity when not defined', () => {
		expect(normalizeCollectPackageJsonPathsUpDirectoryTreeOptions()).toEqual({
			depth: Number.POSITIVE_INFINITY,
			cwd: process.cwd(),
			maxPackages: 2,
		} as NormalizedCollectPackageJsonPathsUpDirectoryTreeOptions);
	});

	it('should keep the overrides', () => {
		const depthOverride = 2;
		const maxPackagesOverride = 1;
		expect(
			normalizeCollectPackageJsonPathsUpDirectoryTreeOptions({
				depth: depthOverride,
				maxPackages: maxPackagesOverride,
			}),
		).toEqual({
			depth: depthOverride,
			cwd: process.cwd(),
			maxPackages: maxPackagesOverride,
		} as NormalizedCollectPackageJsonPathsUpDirectoryTreeOptions);
	});
});
