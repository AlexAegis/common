import type { CollectWorkspacePackagesOptions, WorkspacePackage } from '@alexaegis/workspace-tools';
import { join } from 'node:path/posix';
import { afterAll, describe, expect, it, vi } from 'vitest';
import { mockProjectRoot } from '../../__mocks__/globby.js';
import { collectLcovReportPaths } from './collect-lcov-report-paths.function.js';

vi.mock('globby');
vi.mock('fs');

const cwdSpy = vi.spyOn(process, 'cwd').mockImplementation(() => mockProjectRoot);

vi.mock('@alexaegis/workspace-tools', async () => {
	const actualWorkspaceTools = await vi.importActual<typeof import('@alexaegis/workspace-tools')>(
		'@alexaegis/workspace-tools'
	);

	return {
		getWorkspaceRoot: vi.fn<[], string | undefined>((cwd = process.cwd()) => {
			return cwd.startsWith(mockProjectRoot) ? mockProjectRoot : undefined;
		}),
		collectWorkspacePackages: vi.fn(
			(rawOptions?: CollectWorkspacePackagesOptions): WorkspacePackage[] => {
				expect(rawOptions?.skipWorkspaceRoot).toBeTruthy();

				const cwd = rawOptions?.cwd ?? process.cwd();

				return cwd.startsWith(mockProjectRoot)
					? [
							{ path: `${mockProjectRoot}/package/zed`, packageJson: {} },
							{ path: `${mockProjectRoot}/package/zod`, packageJson: {} },
							{ path: `${mockProjectRoot}/package/notest`, packageJson: {} },
					  ]
					: [];
			}
		),
		normalizeCollectWorkspacePackagesOptions:
			actualWorkspaceTools.normalizeCollectWorkspacePackagesOptions,
		NODE_MODULES_DIRECTORY_NAME: actualWorkspaceTools.NODE_MODULES_DIRECTORY_NAME,
	};
});

describe('collectLcovReportPaths', () => {
	afterAll(() => {
		vi.resetAllMocks();
	});

	it('should return paths of all lcov reports in the workspace except at the root', async () => {
		expect(await collectLcovReportPaths()).toEqual([
			join(mockProjectRoot, 'packages/zed/coverage/lcov.info'),
			join(mockProjectRoot, 'packages/zod/coverage/lcov.info'),
		]);
	});

	it('should not find any outside of the project', async () => {
		cwdSpy.mockImplementationOnce(() => '/foo');

		expect(await collectLcovReportPaths()).toEqual([]);
	});
});
