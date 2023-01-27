import { afterEach, describe, expect, it, vi } from 'vitest';
import {
	CreateLoggerOptions,
	normalizeCreateLoggerOptions,
	NormalizedCreateLoggerOptions,
} from './create-logger.function.options.js';
import { LogLevel } from './log-level.js';

describe('CreateLoggerOptions', () => {
	const baseCreateLoggerOptions: CreateLoggerOptions = { prefix: 'test' };
	afterEach(() => {
		vi.clearAllMocks();
	});

	it('should default to INFO when not defined', () => {
		expect(normalizeCreateLoggerOptions(baseCreateLoggerOptions)).toEqual({
			...baseCreateLoggerOptions,
			logLevel: LogLevel.INFO,
		} as NormalizedCreateLoggerOptions);
	});

	it('should use the passed logLevel when defined', () => {
		const defined: NormalizedCreateLoggerOptions = {
			...baseCreateLoggerOptions,
			logLevel: LogLevel.ERROR,
		};

		expect(normalizeCreateLoggerOptions(defined)).toEqual(defined);
	});
});
