import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { mockProcessCwd, mockProcessCwdValue } from '../functions/cwd.option.spec.js';
import {
	normalizePrettifyOptions,
	type NormalizedPrettifyOptions,
	type PrettifyOptions,
} from './try-prettify.function.options.js';

describe('normalizePrettifyOptions', () => {
	beforeAll(() => {
		mockProcessCwd();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should default to 'babel' when not defined", () => {
		expect(normalizePrettifyOptions()).toEqual({
			cwd: mockProcessCwdValue,
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
