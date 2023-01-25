import type { PathLike } from 'node:fs';
import { vi } from 'vitest';
import type { PackageJson } from '../../src/const/package-json.interface.js';

export const cpMock = vi.fn<[string, string], Promise<void>>();
export const symlinkMock = vi.fn<[string, string], Promise<void>>();

export default {
	lstat: vi.fn(async (path: string) => {
		switch (path) {
			case 'rcfile':
			case '/foo/bar/packages/rcfile':
			case '/foo/bar/packages/zed/rcfile': {
				return { isFile: () => true, isSymbolicLink: () => false };
			}
			case '/foo/bar/packages/zod/rcfile': {
				return { isFile: () => true, isSymbolicLink: () => true };
			}
			case '/foo/bar/packages/nonfile': {
				return { isFile: () => false, isSymbolicLink: () => true };
			}
			default: {
				return undefined;
			}
		}
	}),
	cp: vi.fn(async (path: string, target: string) => cpMock(path, target)),
	symlink: vi.fn(async (path: string, target: string) => symlinkMock(path, target)),
	readFile: vi.fn(
		async (path: PathLike): Promise<string | undefined> =>
			path === '/foo/bar/package.json'
				? JSON.stringify({
						workspaces: ['apps/*', 'libs/*', 'packages/*'],
				  } as PackageJson)
				: path === '/foo/bar/packages/zed/package.json' ||
				  path === '/foo/bar/packages/zod/package.json'
				? JSON.stringify({} as PackageJson)
				: undefined
	),
};
