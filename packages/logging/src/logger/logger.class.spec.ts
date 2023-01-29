import { noop } from '@alexaegis/common';
import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import { LogLevel } from './log-level.js';
import { Logger } from './logger.class.js';
import type { LoggerOptions } from './logger.class.options.js';

describe('Logger', () => {
	const baseCreateLoggerOptions: LoggerOptions = { domain: 'test' };

	const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(noop);
	const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(noop);
	const consoleInfoSpy = vi.spyOn(console, 'info').mockImplementation(noop);
	const consoleDebugSpy = vi.spyOn(console, 'debug').mockImplementation(noop);
	const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(noop);

	afterEach(() => {
		vi.clearAllMocks();
	});

	afterAll(() => {
		vi.resetAllMocks();
	});

	describe('GLOBAL', () => {
		it('should exist', () => {
			expect(Logger.GLOBAL).toBeDefined();
		});
	});

	describe('NOOP', () => {
		it('should not do anything', () => {
			expect(Logger.OFF.log('foo')).toBeUndefined();
			expect(Logger.OFF.debug('foo')).toBeUndefined();
			expect(Logger.OFF.info('foo')).toBeUndefined();
			expect(Logger.OFF.warning('foo')).toBeUndefined();
			expect(Logger.OFF.error('foo')).toBeUndefined();

			expect(consoleLogSpy).not.toHaveBeenCalled();
			expect(consoleDebugSpy).not.toHaveBeenCalled();
			expect(consoleInfoSpy).not.toHaveBeenCalled();
			expect(consoleWarnSpy).not.toHaveBeenCalled();
			expect(consoleErrorSpy).not.toHaveBeenCalled();
		});
	});

	describe('setDomain', () => {
		it('should change the domain of the logger', () => {
			const logger = new Logger({ domain: 'foo' });
			const newDomain = 'bar';
			logger.setDomain(newDomain);
			expect(logger.options.domain).toBe(newDomain);
		});
	});

	describe('subDomains', () => {
		it('should extend the domain', () => {
			const logger = new Logger({ domain: 'foo' });
			const subDomainLogger = logger.subDomain('bar');
			expect(subDomainLogger.options.domain).toBe('foo:bar');
		});
	});

	describe('the log function of a logger', () => {
		const logger = new Logger({ ...baseCreateLoggerOptions, logLevel: LogLevel.DEBUG });

		it('should not log when LogLevel OFF is passed', () => {
			logger.log('message', LogLevel.OFF);
			expect(consoleErrorSpy).not.toHaveBeenCalled();
			expect(consoleWarnSpy).not.toHaveBeenCalled();
			expect(consoleInfoSpy).not.toHaveBeenCalled();
			expect(consoleDebugSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});

		it('should log without specifying a logLevel', () => {
			logger.log('message');
			expect(consoleErrorSpy).not.toHaveBeenCalled();
			expect(consoleWarnSpy).not.toHaveBeenCalled();
			expect(consoleInfoSpy).not.toHaveBeenCalled();
			expect(consoleDebugSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).toHaveBeenCalled();
		});
	});

	describe('a DEBUG LogLevel logger', () => {
		const logger = new Logger({ ...baseCreateLoggerOptions, logLevel: LogLevel.DEBUG });

		it('should log DEBUG messages', () => {
			logger.log('debug message', LogLevel.DEBUG);
			logger.debug('debug message');
			expect(consoleErrorSpy).not.toHaveBeenCalled();
			expect(consoleWarnSpy).not.toHaveBeenCalled();
			expect(consoleInfoSpy).toHaveBeenCalledTimes(2);
			expect(consoleDebugSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});

		it('should log INFO messages', () => {
			logger.log('info message', LogLevel.INFO);
			logger.info('info message');
			expect(consoleErrorSpy).not.toHaveBeenCalled();
			expect(consoleWarnSpy).not.toHaveBeenCalled();
			expect(consoleInfoSpy).toHaveBeenCalledTimes(2);
			expect(consoleDebugSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});

		it('should log WARNING messages', () => {
			logger.log('warning message', LogLevel.WARNING);
			logger.warning('warning message');
			expect(consoleErrorSpy).not.toHaveBeenCalled();
			expect(consoleWarnSpy).toHaveBeenCalledTimes(2);
			expect(consoleInfoSpy).not.toHaveBeenCalled();
			expect(consoleDebugSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});

		it('should log ERROR messages', () => {
			logger.log('error message', LogLevel.ERROR);
			logger.error('error message');
			expect(consoleErrorSpy).toHaveBeenCalledTimes(2);
			expect(consoleWarnSpy).not.toHaveBeenCalled();
			expect(consoleInfoSpy).not.toHaveBeenCalled();
			expect(consoleDebugSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});
	});

	describe('an INFO LogLevel logger', () => {
		const logger = new Logger(baseCreateLoggerOptions);

		it('should not log DEBUG messages', () => {
			logger.log('debug message', LogLevel.DEBUG);
			logger.debug('debug message');
			expect(consoleErrorSpy).not.toHaveBeenCalled();
			expect(consoleWarnSpy).not.toHaveBeenCalled();
			expect(consoleInfoSpy).not.toHaveBeenCalled();
			expect(consoleDebugSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});

		it('should log INFO messages', () => {
			logger.log('info message', LogLevel.INFO);
			logger.info('info message');
			expect(consoleErrorSpy).not.toHaveBeenCalled();
			expect(consoleWarnSpy).not.toHaveBeenCalled();
			expect(consoleInfoSpy).toHaveBeenCalledTimes(2);
			expect(consoleDebugSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});

		it('should log WARNING messages', () => {
			logger.log('warning message', LogLevel.WARNING);
			logger.warning('warning message');
			expect(consoleErrorSpy).not.toHaveBeenCalled();
			expect(consoleWarnSpy).toHaveBeenCalledTimes(2);
			expect(consoleInfoSpy).not.toHaveBeenCalled();
			expect(consoleDebugSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});

		it('should log ERROR messages', () => {
			logger.log('error message', LogLevel.ERROR);
			logger.error('error message');
			expect(consoleErrorSpy).toHaveBeenCalledTimes(2);
			expect(consoleWarnSpy).not.toHaveBeenCalled();
			expect(consoleInfoSpy).not.toHaveBeenCalled();
			expect(consoleDebugSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});
	});

	describe('a WARNING LogLevel logger', () => {
		const logger = new Logger({ ...baseCreateLoggerOptions, logLevel: LogLevel.WARNING });

		it('should not log DEBUG messages', () => {
			logger.log('debug message', LogLevel.DEBUG);
			logger.debug('debug message');
			expect(consoleErrorSpy).not.toHaveBeenCalled();
			expect(consoleWarnSpy).not.toHaveBeenCalled();
			expect(consoleInfoSpy).not.toHaveBeenCalled();
			expect(consoleDebugSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});

		it('should not log INFO messages', () => {
			logger.log('info message', LogLevel.INFO);
			logger.info('info message');
			expect(consoleErrorSpy).not.toHaveBeenCalled();
			expect(consoleWarnSpy).not.toHaveBeenCalled();
			expect(consoleInfoSpy).not.toHaveBeenCalled();
			expect(consoleDebugSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});

		it('should log WARNING messages', () => {
			logger.log('warning message', LogLevel.WARNING);
			logger.warning('warning message');
			expect(consoleErrorSpy).not.toHaveBeenCalled();
			expect(consoleWarnSpy).toHaveBeenCalledTimes(2);
			expect(consoleInfoSpy).not.toHaveBeenCalled();
			expect(consoleDebugSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});

		it('should log ERROR messages', () => {
			logger.log('error message', LogLevel.ERROR);
			logger.error('error message');
			expect(consoleErrorSpy).toHaveBeenCalledTimes(2);
			expect(consoleWarnSpy).not.toHaveBeenCalled();
			expect(consoleInfoSpy).not.toHaveBeenCalled();
			expect(consoleDebugSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});
	});

	describe('an ERROR LogLevel logger', () => {
		const logger = new Logger({ ...baseCreateLoggerOptions, logLevel: LogLevel.ERROR });

		it('should not log DEBUG messages', () => {
			logger.log('debug message', LogLevel.DEBUG);
			logger.debug('debug message');
			expect(consoleErrorSpy).not.toHaveBeenCalled();
			expect(consoleWarnSpy).not.toHaveBeenCalled();
			expect(consoleInfoSpy).not.toHaveBeenCalled();
			expect(consoleDebugSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});

		it('should not log INFO messages', () => {
			logger.log('info message', LogLevel.INFO);
			logger.info('info message');
			expect(consoleErrorSpy).not.toHaveBeenCalled();
			expect(consoleWarnSpy).not.toHaveBeenCalled();
			expect(consoleInfoSpy).not.toHaveBeenCalled();
			expect(consoleDebugSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});

		it('should not log WARNING messages', () => {
			logger.log('warning message', LogLevel.WARNING);
			logger.warning('warning message');
			expect(consoleErrorSpy).not.toHaveBeenCalled();
			expect(consoleWarnSpy).not.toHaveBeenCalled();
			expect(consoleInfoSpy).not.toHaveBeenCalled();
			expect(consoleDebugSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});

		it('should log ERROR messages', () => {
			logger.log('error message', LogLevel.ERROR);
			logger.error('error message');
			expect(consoleErrorSpy).toHaveBeenCalledTimes(2);
			expect(consoleWarnSpy).not.toHaveBeenCalled();
			expect(consoleInfoSpy).not.toHaveBeenCalled();
			expect(consoleDebugSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});
	});

	describe('an OFF LogLevel logger', () => {
		const logger = new Logger({ ...baseCreateLoggerOptions, logLevel: LogLevel.OFF });

		it('should not log DEBUG messages', () => {
			logger.log('debug message', LogLevel.DEBUG);
			logger.debug('debug message');
			expect(consoleErrorSpy).not.toHaveBeenCalled();
			expect(consoleWarnSpy).not.toHaveBeenCalled();
			expect(consoleInfoSpy).not.toHaveBeenCalled();
			expect(consoleDebugSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});

		it('should not log INFO messages', () => {
			logger.log('info message', LogLevel.INFO);
			logger.info('info message');
			expect(consoleErrorSpy).not.toHaveBeenCalled();
			expect(consoleWarnSpy).not.toHaveBeenCalled();
			expect(consoleInfoSpy).not.toHaveBeenCalled();
			expect(consoleDebugSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});

		it('should not log WARNING messages', () => {
			logger.log('warning message', LogLevel.WARNING);
			logger.warning('warning message');
			expect(consoleErrorSpy).not.toHaveBeenCalled();
			expect(consoleWarnSpy).not.toHaveBeenCalled();
			expect(consoleInfoSpy).not.toHaveBeenCalled();
			expect(consoleDebugSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});

		it('should not log ERROR messages', () => {
			logger.log('error message', LogLevel.ERROR);
			logger.error('error message');
			expect(consoleErrorSpy).not.toHaveBeenCalled();
			expect(consoleWarnSpy).not.toHaveBeenCalled();
			expect(consoleInfoSpy).not.toHaveBeenCalled();
			expect(consoleDebugSpy).not.toHaveBeenCalled();
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});
	});
});
