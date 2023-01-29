import { describe, expect, it } from 'vitest';
import { Logger } from './logger.class.js';
import { LoggerOption, NormalizedLoggerOption, normalizeLoggerOption } from './logger.option.js';

describe('normalizeDryOption', () => {
	it('should have a default when not defined', () => {
		expect(normalizeLoggerOption()).toEqual({
			logger: Logger.OFF,
		} as NormalizedLoggerOption);
	});

	it('should use the provided values when defined', () => {
		const manualOptions: LoggerOption = {
			logger: new Logger({ domain: 'test' }),
		};
		expect(normalizeLoggerOption(manualOptions)).toEqual(manualOptions);
	});
});
