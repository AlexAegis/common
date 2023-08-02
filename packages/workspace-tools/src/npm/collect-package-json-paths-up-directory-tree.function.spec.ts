import { join } from 'node:path/posix';
import { describe, expect, it, vi } from 'vitest';
import { mockProjectRoot } from '../../__mocks__/fs.js';
import { collectPackageJsonPathsUpDirectoryTree } from './collect-package-json-paths-up-directory-tree.function.js';

vi.mock('fs');

describe('collectPackageJsonPathsUpDirectoryTree', () => {
	it('should find nothing when not in a workspace', () => {
		const foundPackageJsons = collectPackageJsonPathsUpDirectoryTree({ cwd: '/foo' });
		expect(foundPackageJsons).toEqual([]);
	});

	it('should be able to return the root of the workspace from the root', () => {
		const testPath = mockProjectRoot;
		const foundPackageJsons = collectPackageJsonPathsUpDirectoryTree({ cwd: testPath });
		expect(foundPackageJsons).toEqual([mockProjectRoot]);
	});

	it('should be able to walk from zed', () => {
		const testPath = join(mockProjectRoot, 'packages', 'zed');
		const foundPackageJsons = collectPackageJsonPathsUpDirectoryTree({ cwd: testPath });
		expect(foundPackageJsons).toEqual([mockProjectRoot, testPath]);
	});

	it('should be able to walk from zod', () => {
		const testPath = join(mockProjectRoot, 'packages', 'zod');
		const foundPackageJsons = collectPackageJsonPathsUpDirectoryTree({ cwd: testPath });
		expect(foundPackageJsons).toEqual([mockProjectRoot, testPath]);
	});

	describe('depth', () => {
		it('should not find anything if the depth is smaller than how deep you start in the package', () => {
			const testPath = join(mockProjectRoot, 'packages', 'zod', 'a', 'b');
			const foundPackageJsons = collectPackageJsonPathsUpDirectoryTree({
				cwd: testPath,
				depth: 1,
			});
			expect(foundPackageJsons).toEqual([]);
		});

		it('should not find anything if maxPackages is 0 even if you stand directly on top of it', () => {
			const testPath = join(mockProjectRoot, 'packages', 'zod');
			const foundPackageJsons = collectPackageJsonPathsUpDirectoryTree({
				cwd: testPath,
				maxPackages: 0,
			});
			expect(foundPackageJsons).toEqual([]);
		});

		it('should not find the workspace root if the depth only reaches the inner package', () => {
			const packagePath = join(mockProjectRoot, 'packages', 'zod');
			const testPath = join(packagePath, 'a');
			const foundPackageJsons = collectPackageJsonPathsUpDirectoryTree({
				cwd: testPath,
				depth: 1,
			});
			expect(foundPackageJsons).toEqual([packagePath]);
		});

		it('should still find the inner package with depth 0 if cwd is the same folder', () => {
			const packagePath = join(mockProjectRoot, 'packages', 'zod');
			const foundPackageJsons = collectPackageJsonPathsUpDirectoryTree({
				cwd: packagePath,
				depth: 0,
			});
			expect(foundPackageJsons).toEqual([packagePath]);
		});

		it('should still find only the inner package is maxPackages is 1', () => {
			const testPath = join(mockProjectRoot, 'packages', 'zod', 'a', 'b');
			const packagePath = join(mockProjectRoot, 'packages', 'zod');
			const foundPackageJsons = collectPackageJsonPathsUpDirectoryTree({
				cwd: testPath,
				maxPackages: 1,
			});
			expect(foundPackageJsons).toEqual([packagePath]);
		});
	});
});
