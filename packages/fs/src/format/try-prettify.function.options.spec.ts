import type { PrettifyOptions } from 'vite-plugin-autolib';
import { afterEach, beforeAll, describe, expect, it, SpyInstance, vi } from 'vitest';
import { mockCwd, mockCwdOption } from '../directory/cwd.option.spec.js';
import {
	NormalizedPrettifyOptions,
	normalizePrettifyOptions,
} from './try-prettify.function.options.js';

export const mockNormalizePrettifyOptions = (): SpyInstance => {
	return mockCwdOption();
};

describe('normalizePrettifyOptions', () => {
	beforeAll(() => {
		mockNormalizePrettifyOptions();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should default to 'babel' when not defined", () => {
		expect(normalizePrettifyOptions()).toEqual({
			cwd: mockCwd,
			parser: 'babel',
		} as NormalizedPrettifyOptions);
	});

	it('should use the provided values when defined', () => {
		const manualOptions: PrettifyOptions = {
			cwd: '/foo',
			parser: 'html',
		};
		expect(normalizePrettifyOptions(manualOptions)).toEqual(manualOptions);
	});
});
