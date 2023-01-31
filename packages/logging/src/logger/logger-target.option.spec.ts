import { Logger } from 'tslog';
import { describe, expect, it } from 'vitest';
import {
	LoggerOption,
	NormalizedLoggerOption,
	normalizeLoggerOption,
} from './logger-target.option.js';
import { noopLogger } from './noop-logger.const.js';

describe('normalizeLoggerTargetOption', () => {
	it('should have a default when not defined', () => {
		expect(normalizeLoggerOption()).toEqual({
			logger: noopLogger,
		} as NormalizedLoggerOption);
	});

	it('should use the provided values when defined', () => {
		const manualOptions: LoggerOption = {
			logger: new Logger(),
		};
		expect(normalizeLoggerOption(manualOptions)).toEqual(manualOptions);
	});
});
