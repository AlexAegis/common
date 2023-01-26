import type { MockedModule } from '@alexaegis/common';
import { afterAll, beforeAll, describe, expect, it, Mock, vi } from 'vitest';
import { mockFormat, mockPrettifiedJson } from '../../__mocks__/prettier.js';
import { getPrettierFormatter } from './get-prettier-formatter.function.js';

export type MockedModuleGetPrettierFormatter = MockedModule<{ formatMock: Mock<[], string> }>;

describe('getPrettierFormatter', () => {
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

			expect(formatter(input)).toEqual(mockPrettifiedJson);
			expect(mockFormat).toHaveBeenCalledOnce();
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
			expect(formatter(input)).toEqual(input);
		});
	});
});
