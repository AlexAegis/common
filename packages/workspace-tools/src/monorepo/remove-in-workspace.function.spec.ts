import { mockLogger } from '@alexaegis/logging/mocks';
import { join } from 'node:path/posix';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { mockProjectRoot } from '../../__mocks__/fs.js';
import { rmMock } from '../../__mocks__/node:fs/promises.js';
import type { PackageJson } from '../index.js';
import { removeInWorkspace } from './remove-in-workspace.function.js';

vi.mock('globby');
vi.mock('fs');
vi.mock('node:fs/promises');
vi.mock('@alexaegis/fs', async () => {
	const mockReadJson = vi.fn<[string | undefined], Promise<unknown>>(async (_path) => {
		// For some reason the file cannot be read even though it exists
		return {
			workspaces: ['packages/*'],
		} as PackageJson;
	});

	const mockReadYaml = vi.fn<[string | undefined], Promise<unknown>>(async (_path) => {
		return undefined;
	});

	return {
		readJson: mockReadJson,
		readYaml: mockReadYaml,
		normalizeCwdOption: await vi
			.importActual<typeof import('@alexaegis/fs')>('@alexaegis/fs')
			.then((mod) => mod.normalizeCwdOption),
	};
});

describe('removeInWorkspace', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	const filename = './trash';
	const rmOptions = { recursive: true };

	it('should remove files if they exist', async () => {
		await removeInWorkspace(filename, {
			cwd: join(mockProjectRoot, 'packages'),
			logger: mockLogger,
		});

		expect(rmMock).toHaveBeenCalledWith('/foo/bar/trash', rmOptions);
		expect(rmMock).toHaveBeenCalledWith('/foo/bar/packages/zed/trash', rmOptions);
		expect(mockLogger.info).toHaveBeenCalled();
	});

	it('should not remove to any folders when dry', async () => {
		await removeInWorkspace(filename, {
			cwd: join(mockProjectRoot, 'packages'),
			dry: true,
			logger: mockLogger,
		});

		expect(rmMock).not.toHaveBeenCalled();
		expect(mockLogger.info).toHaveBeenCalled();
	});

	it('should log an error if it fails and there is a logger', async () => {
		rmMock.mockRejectedValueOnce('ERROR');

		await removeInWorkspace(filename, {
			cwd: join(mockProjectRoot, 'packages'),
			logger: mockLogger,
		});

		expect(rmMock).toHaveBeenCalled();
		expect(mockLogger.error).toHaveBeenCalled();
	});
});
