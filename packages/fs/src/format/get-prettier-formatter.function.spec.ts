import type { Logger } from '@alexaegis/logging';
import { MockLogger } from '@alexaegis/logging/mocks';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { mockPrettierFormat, mockPrettifiedJson } from '../mocks.js';
import { getPrettierFormatter } from './get-prettier-formatter.function.js';

describe('getPrettierFormatter', () => {
	const mockLogger = new MockLogger();
	const logger = mockLogger as unknown as Logger<unknown>;

	describe('when prettier is present', () => {
		beforeAll(() => {
			// 'prettier' is dynamically imported so it can be dynamically mocked
			vi.doMock('prettier');
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
			const input = '{"foo": "hello",  "bar": 2}';

			expect(await formatter(input)).toEqual(mockPrettifiedJson);
			expect(mockPrettierFormat).toHaveBeenCalledOnce();
		});
	});

	describe('when prettier is not present', () => {
		beforeAll(() => {
			vi.doMock('prettier', () => {
				return {};
			});
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
			expect(await formatter(input)).toEqual(input);
		});
	});

	describe('when prettier is present but its config is invalid', () => {
		beforeAll(() => {
			vi.doMock('prettier', () => {
				return {
					default: {
						format: vi.fn(() => {
							throw new Error('Format failed!');
						}),
						resolveConfig: vi.fn(() => {
							return {};
						}),
					},
				};
			});
		});

		afterAll(() => {
			vi.doUnmock('prettier');
		});

		it('should return strings as is', async () => {
			const formatter = await getPrettierFormatter({ parser: 'json', logger });
			const input = '{ leave me }';
			expect(await formatter(input)).toEqual(input);
			expect(mockLogger.error).toHaveBeenCalled();
		});
	});
});
