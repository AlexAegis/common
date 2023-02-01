import { describe, expect, it } from 'vitest';
import { LogLevel } from './log-level.enum.js';
import {
	LogLevelOption,
	NormalizedLoggerOption,
	normalizeLogLevelOption,
} from './log-level.enum.option.js';

describe('normalizeLogLevelOption', () => {
	it('should have a default when not defined', () => {
		expect(normalizeLogLevelOption()).toEqual({
			logLevel: LogLevel.OFF,
		} as NormalizedLoggerOption);
	});

	it('should use the provided values when defined', () => {
		const manualOptions: LogLevelOption = {
			logLevel: LogLevel.SILLY,
		};
		expect(normalizeLogLevelOption(manualOptions)).toEqual(manualOptions);
	});
});
