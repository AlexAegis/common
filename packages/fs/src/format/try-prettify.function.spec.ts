import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import {
	MockedModuleGetPrettierFormatter,
	mockFormattedFile,
	mockGetPrettierFormatter,
} from './get-prettier-formatter.function.spec.js';
import { tryPrettify } from './try-prettify.function.js';
import type { PrettifyOptions } from './try-prettify.function.options.js';

export const mockTryPrettify = (): MockedModuleGetPrettierFormatter => {
	return mockGetPrettierFormatter(true);
};

describe('tryPrettify', () => {
	let mock: MockedModuleGetPrettierFormatter;

	beforeAll(() => {
		mock = mockTryPrettify();
	});

	afterEach(() => {
		vi.clearAllMocks();
		mock.unmock();
	});

	it('should call the function returned by getPrettierFormatter', async () => {
		const unformatted = 'anything';
		const prettifyOptions: PrettifyOptions = { parser: 'json-stringify' };
		const result = await tryPrettify(unformatted, prettifyOptions);
		expect(result).toEqual(mockFormattedFile);
		expect(mock.data.formatMock).toHaveBeenCalledWith(unformatted, prettifyOptions);
	});
});
