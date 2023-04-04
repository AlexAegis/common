import type { Options } from 'prettier';
import { vi } from 'vitest';

export const mockPrettifiedJson = 'prettyJson';
export const mockPrettierFormat: ReturnType<typeof vi.fn<[string, Options], string | undefined>> =
	vi.fn<[string, Options], string | undefined>((_data: string) => mockPrettifiedJson);

const mockResolveConfig: ReturnType<typeof vi.fn<[string], Promise<Options>>> = vi.fn<
	[string],
	Promise<Options>
>();

export const mockPrettier: () => {
	format: typeof mockPrettierFormat;
	resolveConfig: typeof mockResolveConfig;
} = () => {
	return {
		format: mockPrettierFormat,
		resolveConfig: mockResolveConfig,
	};
};
