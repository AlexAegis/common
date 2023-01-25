import type { MockedModule } from '@alexaegis/common';
import { afterAll, beforeAll, describe, expect, it, Mock, vi } from 'vitest';
import { getPrettierFormatter } from './get-prettier-formatter.function.js';

export const mockFormattedFile = 'formatted';

export type MockedModuleGetPrettierFormatter = MockedModule<{ formatMock: Mock<[], string> }>;

export const mockGetPrettierFormatter = (
	isPrettierPresent: boolean
): MockedModule<{ formatMock: Mock<[], string> }> => {
	const formatMock = vi.fn(() => mockFormattedFile);
	if (isPrettierPresent) {
		vi.doMock('prettier', () => {
			return {
				default: {
					resolveConfig: vi.fn(),
					format: formatMock,
				},
			};
		});
	} else {
		vi.doMock('prettier', () => {
			return {
				default: undefined,
			};
		});
	}

	return { unmock: () => vi.unmock('prettier'), data: { formatMock } };
};

describe('getPrettierFormatter', () => {
	describe('when prettier is present', () => {
		beforeAll(() => {
			mockGetPrettierFormatter(true);
		});

		afterAll(() => {
			vi.doUnmock('prettier');
		});

		it('should return a function', async () => {
			const formatter = await getPrettierFormatter();
			expect(typeof formatter).toEqual('function');
		});

		it('should return a formatted json', async () => {
			const formatter = await getPrettierFormatter({ parser: 'json' });
			const input = '{"foo": "hello", "bar": 2}';

			expect(formatter(input)).toEqual(mockFormattedFile);
		});
	});

	describe('when prettier is not present', () => {
		beforeAll(() => {
			mockGetPrettierFormatter(false);
		});

		afterAll(() => {
			vi.doUnmock('prettier');
		});

		it('should return a function', async () => {
			const formatter = await getPrettierFormatter();
			expect(typeof formatter).toEqual('function');
		});

		it('should return strings as is', async () => {
			const formatter = await getPrettierFormatter({ parser: 'json' });
			const input = '{im: not: even, making, sense}';
			expect(formatter(input)).toEqual(input);
		});
	});
});
