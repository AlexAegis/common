import type { Options } from 'prettier';
import { vi } from 'vitest';

export const mockPrettifiedJson = 'prettyJson';
export const mockFormat = vi.fn<[string, Options], string | undefined>(
	(_data: string) => mockPrettifiedJson
);

export default {
	resolveConfig: vi.fn<[string], Promise<Options>>(),
	format: mockFormat,
};
