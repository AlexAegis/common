import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { mockFormat, mockPrettifiedJson } from '../../__mocks__/prettier.js';

import { tryPrettify } from './try-prettify.function.js';
import type { PrettifyOptions } from './try-prettify.function.options.js';

describe('tryPrettify', () => {
	beforeAll(() => {
		vi.mock('prettier');
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('should call the function returned by getPrettierFormatter', async () => {
		const unformatted = 'unformattedJson';
		const prettifyOptions: PrettifyOptions = { parser: 'json-stringify' };
		const result = await tryPrettify(unformatted, prettifyOptions);
		expect(result).toEqual(mockPrettifiedJson);

		expect(mockFormat).toHaveBeenCalledWith(unformatted, prettifyOptions);
	});
});
