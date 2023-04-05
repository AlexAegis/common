import type { Options } from 'globby';
import { join } from 'node:path/posix';
import { afterAll, describe, expect, it, vi } from 'vitest';
import { mockProjectRoot } from '../../__mocks__/fs.js';
import {
	PACKAGE_JSON_NAME,
	PNPM_WORKSPACE_FILE_NAME,
	type PackageJson,
	type PnpmWorkspaceYaml,
} from '../package-json/package-json.interface.js';
import { collectWorkspacePackages } from './collect-workspace-packages.function.js';

const mockPackageJsonValue: PackageJson = {
	name: 'name',
};

vi.mock('@alexaegis/fs', async () => {
	const mockReadJson = vi.fn<[string | undefined], Promise<PackageJson | undefined>>((path) =>
		Promise.resolve(path?.endsWith(PACKAGE_JSON_NAME) ? mockPackageJsonValue : undefined)
	);

	const mockReadYaml = vi.fn<[string | undefined], Promise<PnpmWorkspaceYaml | undefined>>(
		(path) =>
			Promise.resolve(
				path?.endsWith(PNPM_WORKSPACE_FILE_NAME)
					? ({
							packages: ['packages/*'],
					  } satisfies PnpmWorkspaceYaml)
					: undefined
			)
	);

	return {
		readJson: mockReadJson,
		readYaml: mockReadYaml,
		normalizeCwdOption: await vi
			.importActual<typeof import('@alexaegis/fs')>('@alexaegis/fs')
			.then((mod) => mod.normalizeCwdOption),
	};
});

vi.mock('node:fs', () => {
	return {
		existsSync: vi.fn(
			(path: string) =>
				path === join(mockProjectRoot, 'packages/zed', PACKAGE_JSON_NAME) ||
				path === join(mockProjectRoot, 'packages/zod', PACKAGE_JSON_NAME) ||
				path === join(mockProjectRoot, PACKAGE_JSON_NAME)
		),
	};
});

vi.mock('globby', () => {
	return {
		globby: (patterns: string[], options: Options): string[] => {
			expect(options.absolute).toBeTruthy();
			expect(options.onlyDirectories).toBeTruthy();
			expect(options.cwd).toBe('/foo/bar');

			return patterns.some((pattern) => pattern.startsWith('packages/*'))
				? ['/foo/bar/packages/zed', '/foo/bar/packages/zod']
				: [];
		},
	};
});

describe('collectWorkspacePackages in a multi-package pnpm workspace', () => {
	afterAll(() => {
		vi.resetAllMocks();
	});

	it('should be able to collect all packages in a workspace from a sub package', async () => {
		const foundPackageJsons = await collectWorkspacePackages({ cwd: '/foo/bar/packages/zed' });
		expect(foundPackageJsons).toEqual([
			{ path: '/foo/bar', packageJson: mockPackageJsonValue },
			{ path: '/foo/bar/packages/zed', packageJson: mockPackageJsonValue },
			{ path: '/foo/bar/packages/zod', packageJson: mockPackageJsonValue },
		]);
	});

	it('should be able to collect all packages in a workspace from the root', async () => {
		const foundPackageJsons = await collectWorkspacePackages({ cwd: '/foo/bar' });
		expect(foundPackageJsons).toEqual([
			{ packageJson: mockPackageJsonValue, path: '/foo/bar' },
			{ packageJson: mockPackageJsonValue, path: '/foo/bar/packages/zed' },
			{ packageJson: mockPackageJsonValue, path: '/foo/bar/packages/zod' },
		]);
	});

	it('should be able to collect nothing, outside the workspace', async () => {
		const foundPackageJsons = await collectWorkspacePackages({ cwd: '/foo' });
		expect(foundPackageJsons).toEqual([]);
	});
});
