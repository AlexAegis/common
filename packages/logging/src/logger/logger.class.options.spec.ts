import { afterEach, describe, expect, it, vi } from 'vitest';
import { LogLevel } from './log-level.js';
import {
	LoggerOptions,
	NormalizedLoggerOptions,
	normalizeLoggerOptions,
} from './logger.class.options.js';

describe('LoggerOptions', () => {
	const baseLoggerOptions: LoggerOptions = { domain: 'test' };
	afterEach(() => {
		vi.clearAllMocks();
	});

	it('should default to INFO when not defined', () => {
		expect(normalizeLoggerOptions(baseLoggerOptions)).toEqual({
			...baseLoggerOptions,
			logLevel: LogLevel.INFO,
		} as NormalizedLoggerOptions);
	});

	it('should use the passed logLevel when defined', () => {
		const defined: NormalizedLoggerOptions = {
			...baseLoggerOptions,
			logLevel: LogLevel.ERROR,
		};

		expect(normalizeLoggerOptions(defined)).toEqual(defined);
	});
});
