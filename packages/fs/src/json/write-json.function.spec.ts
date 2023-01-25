import type { PathLike } from 'node:fs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
	MockedModuleGetPrettierFormatter,
	mockFormattedFile,
} from '../format/get-prettier-formatter.function.spec.js';
import { mockTryPrettify } from '../format/try-prettify.function.spec.js';
import { writeJson } from './write-json.function.js';

const testJson = {
	foo: { bar: 1, zed: 'hello' },
};
const writeFileMock = vi.fn();

describe('writeJson', () => {
	const testFileName = 'test.json';

	let tryPrettifyMock: MockedModuleGetPrettierFormatter;

	beforeEach(() => {
		tryPrettifyMock = mockTryPrettify();
		vi.mock('node:fs/promises', async () => {
			return {
				writeFile: vi.fn(async (path: PathLike, data: unknown): Promise<void> => {
					writeFileMock(path, data);
				}),
			};
		});
	});

	afterEach(() => {
		vi.clearAllMocks();
		tryPrettifyMock.unmock();
	});

	it('should write the stringified form of the object when not prettified', async () => {
		await writeJson(testJson, testFileName, { autoPrettier: false });
		expect(writeFileMock).toHaveBeenCalledWith(testFileName, JSON.stringify(testJson));
		expect(tryPrettifyMock.data.formatMock).not.toHaveBeenCalled();
	});

	it('should write the stringified form of the object when not prettified', async () => {
		await writeJson(testJson, testFileName, { autoPrettier: true });
		expect(writeFileMock).toHaveBeenCalledWith(testFileName, mockFormattedFile);
		expect(tryPrettifyMock.data.formatMock).toHaveBeenCalled();
	});
});
