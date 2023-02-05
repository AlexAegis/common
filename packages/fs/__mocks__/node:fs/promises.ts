import type { PathLike, Stats } from 'node:fs';
import { vi } from 'vitest';

export const mockWriteFile = vi.fn<[PathLike, unknown], Promise<void>>(async () => undefined);

export const mockLstat = vi.fn(async (path: PathLike): Promise<Stats | undefined> => {
	if (
		path.toString().endsWith('.sh') ||
		path.toString().endsWith('.txt') ||
		path.toString().endsWith('.js') ||
		path.toString().endsWith('.ts')
	) {
		return {
			isFile: () => true,
			mode: path.toString().includes('executable') ? 0o111 : 0o444,
		} as Stats;
	} else if (path.toString().endsWith('directory')) {
		return { isFile: () => false, isDirectory: () => true } as Stats;
	} else {
		throw new Error('non existent!');
	}
});

export const mockChmod = vi.fn(async () => undefined);

export const mockReadFile = vi.fn<[PathLike, unknown], Promise<string>>();

export const readFile = mockReadFile;
export const writeFile = mockWriteFile;
export const lstat = mockLstat;
export const chmod = mockChmod;
