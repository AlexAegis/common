import { afterEach, describe, expect, it, vi } from 'vitest';
import { createLogger } from './create-logger.function.js';
import type { CreateLoggerOptions } from './create-logger.function.options.js';
import { LogLevel } from './log-level.js';

describe('createLogger', () => {
	const baseCreateLoggerOptions: CreateLoggerOptions = { prefix: 'test' };

	const consoleErrorSpy = vi.spyOn(console, 'error');
	const consoleWarnSpy = vi.spyOn(console, 'warn');
	const consoleInfoSpy = vi.spyOn(console, 'info');
	const consoleTraceSpy = vi.spyOn(console, 'trace');
	const consoleLogSpy = vi.spyOn(console, 'log');

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe('the log function of a logger', () => {
		const logger = createLogger({ ...baseCreateLoggerOptions, logLevel: LogLevel.TRACE });

		it('should not log when LogLevel OFF is passed', () => {
			logger.log('message', LogLevel.OFF);
			expect(consoleErrorSpy).not.toHaveBeenCalled();
			expect(consoleWarnSpy).not.toHaveBeenCalled();
			expect(consoleInfoSpy).not.toHaveBeenCalled();
			expect(consoleTraceSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});
	});

	describe('a TRACE LogLevel logger', () => {
		const logger = createLogger({ ...baseCreateLoggerOptions, logLevel: LogLevel.TRACE });

		it('should log TRACE messages', () => {
			logger.log('trace message', LogLevel.TRACE);
			logger.trace('trace message');
			expect(consoleErrorSpy).not.toHaveBeenCalled();
			expect(consoleWarnSpy).not.toHaveBeenCalled();
			expect(consoleInfoSpy).toHaveBeenCalledTimes(2);
			expect(consoleTraceSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});

		it('should log INFO messages', () => {
			logger.log('info message');
			logger.info('info message');
			expect(consoleErrorSpy).not.toHaveBeenCalled();
			expect(consoleWarnSpy).not.toHaveBeenCalled();
			expect(consoleInfoSpy).toHaveBeenCalledTimes(2);
			expect(consoleTraceSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});

		it('should log WARNING messages', () => {
			logger.log('warning message', LogLevel.WARNING);
			logger.warning('warning message');
			expect(consoleErrorSpy).not.toHaveBeenCalled();
			expect(consoleWarnSpy).toHaveBeenCalledTimes(2);
			expect(consoleInfoSpy).not.toHaveBeenCalled();
			expect(consoleTraceSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});

		it('should log ERROR messages', () => {
			logger.log('error message', LogLevel.ERROR);
			logger.error('error message');
			expect(consoleErrorSpy).toHaveBeenCalledTimes(2);
			expect(consoleWarnSpy).not.toHaveBeenCalled();
			expect(consoleInfoSpy).not.toHaveBeenCalled();
			expect(consoleTraceSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});
	});

	describe('an INFO LogLevel logger', () => {
		const logger = createLogger(baseCreateLoggerOptions);

		it('should not log TRACE messages', () => {
			logger.log('trace message', LogLevel.TRACE);
			logger.trace('trace message');
			expect(consoleErrorSpy).not.toHaveBeenCalled();
			expect(consoleWarnSpy).not.toHaveBeenCalled();
			expect(consoleInfoSpy).not.toHaveBeenCalled();
			expect(consoleTraceSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});

		it('should log INFO messages', () => {
			logger.log('info message');
			logger.info('info message');
			expect(consoleErrorSpy).not.toHaveBeenCalled();
			expect(consoleWarnSpy).not.toHaveBeenCalled();
			expect(consoleInfoSpy).toHaveBeenCalledTimes(2);
			expect(consoleTraceSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});

		it('should log WARNING messages', () => {
			logger.log('warning message', LogLevel.WARNING);
			logger.warning('warning message');
			expect(consoleErrorSpy).not.toHaveBeenCalled();
			expect(consoleWarnSpy).toHaveBeenCalledTimes(2);
			expect(consoleInfoSpy).not.toHaveBeenCalled();
			expect(consoleTraceSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});

		it('should log ERROR messages', () => {
			logger.log('error message', LogLevel.ERROR);
			logger.error('error message');
			expect(consoleErrorSpy).toHaveBeenCalledTimes(2);
			expect(consoleWarnSpy).not.toHaveBeenCalled();
			expect(consoleInfoSpy).not.toHaveBeenCalled();
			expect(consoleTraceSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});
	});

	describe('a WARNING LogLevel logger', () => {
		const logger = createLogger({ ...baseCreateLoggerOptions, logLevel: LogLevel.WARNING });

		it('should not log TRACE messages', () => {
			logger.log('trace message', LogLevel.TRACE);
			logger.trace('trace message');
			expect(consoleErrorSpy).not.toHaveBeenCalled();
			expect(consoleWarnSpy).not.toHaveBeenCalled();
			expect(consoleInfoSpy).not.toHaveBeenCalled();
			expect(consoleTraceSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});

		it('should not log INFO messages', () => {
			logger.log('info message');
			logger.info('info message');
			expect(consoleErrorSpy).not.toHaveBeenCalled();
			expect(consoleWarnSpy).not.toHaveBeenCalled();
			expect(consoleInfoSpy).not.toHaveBeenCalled();
			expect(consoleTraceSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});

		it('should log WARNING messages', () => {
			logger.log('warning message', LogLevel.WARNING);
			logger.warning('warning message');
			expect(consoleErrorSpy).not.toHaveBeenCalled();
			expect(consoleWarnSpy).toHaveBeenCalledTimes(2);
			expect(consoleInfoSpy).not.toHaveBeenCalled();
			expect(consoleTraceSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});

		it('should log ERROR messages', () => {
			logger.log('error message', LogLevel.ERROR);
			logger.error('error message');
			expect(consoleErrorSpy).toHaveBeenCalledTimes(2);
			expect(consoleWarnSpy).not.toHaveBeenCalled();
			expect(consoleInfoSpy).not.toHaveBeenCalled();
			expect(consoleTraceSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});
	});

	describe('an ERROR LogLevel logger', () => {
		const logger = createLogger({ ...baseCreateLoggerOptions, logLevel: LogLevel.ERROR });

		it('should not log TRACE messages', () => {
			logger.log('trace message', LogLevel.TRACE);
			logger.trace('trace message');
			expect(consoleErrorSpy).not.toHaveBeenCalled();
			expect(consoleWarnSpy).not.toHaveBeenCalled();
			expect(consoleInfoSpy).not.toHaveBeenCalled();
			expect(consoleTraceSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});

		it('should not log INFO messages', () => {
			logger.log('info message');
			logger.info('info message');
			expect(consoleErrorSpy).not.toHaveBeenCalled();
			expect(consoleWarnSpy).not.toHaveBeenCalled();
			expect(consoleInfoSpy).not.toHaveBeenCalled();
			expect(consoleTraceSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});

		it('should not log WARNING messages', () => {
			logger.log('warning message', LogLevel.WARNING);
			logger.warning('warning message');
			expect(consoleErrorSpy).not.toHaveBeenCalled();
			expect(consoleWarnSpy).not.toHaveBeenCalled();
			expect(consoleInfoSpy).not.toHaveBeenCalled();
			expect(consoleTraceSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});

		it('should log ERROR messages', () => {
			logger.log('error message', LogLevel.ERROR);
			logger.error('error message');
			expect(consoleErrorSpy).toHaveBeenCalledTimes(2);
			expect(consoleWarnSpy).not.toHaveBeenCalled();
			expect(consoleInfoSpy).not.toHaveBeenCalled();
			expect(consoleTraceSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});
	});

	describe('an OFF LogLevel logger', () => {
		const logger = createLogger({ ...baseCreateLoggerOptions, logLevel: LogLevel.OFF });

		it('should not log TRACE messages', () => {
			logger.log('trace message', LogLevel.TRACE);
			logger.trace('trace message');
			expect(consoleErrorSpy).not.toHaveBeenCalled();
			expect(consoleWarnSpy).not.toHaveBeenCalled();
			expect(consoleInfoSpy).not.toHaveBeenCalled();
			expect(consoleTraceSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});

		it('should not log INFO messages', () => {
			logger.log('info message');
			logger.info('info message');
			expect(consoleErrorSpy).not.toHaveBeenCalled();
			expect(consoleWarnSpy).not.toHaveBeenCalled();
			expect(consoleInfoSpy).not.toHaveBeenCalled();
			expect(consoleTraceSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});

		it('should not log WARNING messages', () => {
			logger.log('warning message', LogLevel.WARNING);
			logger.warning('warning message');
			expect(consoleErrorSpy).not.toHaveBeenCalled();
			expect(consoleWarnSpy).not.toHaveBeenCalled();
			expect(consoleInfoSpy).not.toHaveBeenCalled();
			expect(consoleTraceSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});

		it('should not log ERROR messages', () => {
			logger.log('error message', LogLevel.ERROR);
			logger.error('error message');
			expect(consoleErrorSpy).not.toHaveBeenCalled();
			expect(consoleWarnSpy).not.toHaveBeenCalled();
			expect(consoleInfoSpy).not.toHaveBeenCalled();
			expect(consoleTraceSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});
	});
});
