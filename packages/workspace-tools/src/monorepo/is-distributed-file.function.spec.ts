import type { PathLike } from 'node:fs';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DISTRIBUTION_MARK } from './distribute-file-in-workspace.function.js';
import { isDistributedFile } from './is-distributed-file.function.js';

vi.mock('node:fs/promises', () => {
	return {
		readFile: vi.fn(async (path: PathLike): Promise<string | undefined> => {
			if (path.toString() === 'distributed') {
				return DISTRIBUTION_MARK;
			} else if (path.toString() === 'edited') {
				return 'edited';
			} else {
				return undefined;
			}
		}),
	};
});

describe('isDistributedFile', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it('should return true if the file contains the mark', async () => {
		expect(await isDistributedFile('distributed')).toBeTruthy();
	});

	it('should return false if the file does not contain the mark', async () => {
		expect(await isDistributedFile('edited')).toBeFalsy();
	});

	it('should return false if the file does not exist', async () => {
		expect(await isDistributedFile('nonexistent')).toBeFalsy();
	});
});
