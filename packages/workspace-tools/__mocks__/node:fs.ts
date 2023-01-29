import type { PathLike } from 'node:fs';
import { join } from 'node:path/posix';
import { vi } from 'vitest';
import { PACKAGE_JSON_NAME } from '../src/const/package-json.interface.js';

export const mockProjectRoot = '/foo/bar';

// I do not get coverage here even if it's running. If I change from using node:fs to fs it works
/* c8 ignore start */
export const existsSync = vi.fn((path: PathLike) => {
	const workspaceFiles = new Set([
		join(mockProjectRoot, 'packages/zed', PACKAGE_JSON_NAME),
		join(mockProjectRoot, 'packages/zed/rcfile'),
		join(mockProjectRoot, 'packages/zod', PACKAGE_JSON_NAME),
		join(mockProjectRoot, 'packages/zod/rcfile'),
		join(mockProjectRoot, 'packages/readme.md'),
		join(mockProjectRoot, 'packages/rcfile'),
		join(mockProjectRoot, 'packages/nonfile'),
		join(mockProjectRoot, PACKAGE_JSON_NAME),
	]);

	return workspaceFiles.has(path.toString());
});
/* c8 ignore stop */
