import type { Options } from 'globby';

import { join } from 'node:path/posix';
import { afterAll, describe, expect, it, vi } from 'vitest';
import { mockProjectRoot } from '../../__mocks__/node:fs.js';

import { PackageJson, PACKAGE_JSON_NAME } from '../const/package-json.interface.js';
import { collectWorkspacePackages } from './collect-workspace-packages.function.js';

const mockPackageJsonWorkspaceValue: PackageJson = {
	name: 'name',
	workspaces: ['packages/**'],
};

vi.mock('@alexaegis/fs', () => {
	const mockReadJson = vi.fn<[string | undefined], Promise<unknown>>(async (path) => {
		if (path?.endsWith('package.json')) {
			return mockPackageJsonWorkspaceValue;
		} else {
			return undefined;
		}
	});

	const mockReadYaml = vi.fn<[string | undefined], Promise<unknown>>(async (_path) => {
		return undefined;
	});

	return { readJson: mockReadJson, readYaml: mockReadYaml };
});

vi.mock('node:fs', () => {
	return {
		existsSync: vi.fn((path: string) => {
			return (
				path === join(mockProjectRoot, 'packages/zed', PACKAGE_JSON_NAME) ||
				path === join(mockProjectRoot, 'packages/zod', PACKAGE_JSON_NAME) ||
				path === join(mockProjectRoot, PACKAGE_JSON_NAME)
			);
		}),
	};
});

vi.mock('globby', () => {
	return {
		globby: (_patterns: string[], options: Options): string[] => {
			expect(options.absolute).toBeTruthy();
			expect(options.onlyDirectories).toBeTruthy();
			expect(options.cwd).toBe('/foo/bar');
			return ['/foo/bar/packages/zed', '/foo/bar/packages/zod'];
		},
	};
});

describe('collectWorkspacePackages in a multi-package npm workspace', () => {
	afterAll(() => {
		vi.resetAllMocks();
	});

	it('should be able to collect all packages in a workspace from a sub package', async () => {
		const foundPackageJsons = await collectWorkspacePackages({ cwd: '/foo/bar/packages/zed' });
		expect(foundPackageJsons).toEqual([
			{ path: '/foo/bar', packageJson: mockPackageJsonWorkspaceValue },
			{ path: '/foo/bar/packages/zed', packageJson: mockPackageJsonWorkspaceValue },
			{ path: '/foo/bar/packages/zod', packageJson: mockPackageJsonWorkspaceValue },
		]);
	});

	it('should be able to collect all packages in a workspace from the root', async () => {
		const foundPackageJsons = await collectWorkspacePackages({ cwd: '/foo/bar' });
		expect(foundPackageJsons).toEqual([
			{ packageJson: mockPackageJsonWorkspaceValue, path: '/foo/bar' },
			{ packageJson: mockPackageJsonWorkspaceValue, path: '/foo/bar/packages/zed' },
			{ packageJson: mockPackageJsonWorkspaceValue, path: '/foo/bar/packages/zod' },
		]);
	});

	it('should be able to collect nothing, outside the workspace', async () => {
		const foundPackageJsons = await collectWorkspacePackages({ cwd: '/foo' });
		expect(foundPackageJsons).toEqual([]);
	});
});
