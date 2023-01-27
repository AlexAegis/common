import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import { noopLogger } from './noop-logger.const.js';

describe('noopLogger', () => {
	const consoleLogSpy = vi.spyOn(console, 'log');
	const consoleInfoSpy = vi.spyOn(console, 'info');
	const consoleDebugSpy = vi.spyOn(console, 'debug');
	const consoleWarningSpy = vi.spyOn(console, 'warn');
	const consoleErrorSpy = vi.spyOn(console, 'error');

	afterEach(() => {
		vi.clearAllMocks();
	});

	afterAll(() => {
		vi.resetAllMocks();
	});

	it('should not do anything', () => {
		expect(noopLogger.log('foo')).toBeUndefined();
		expect(noopLogger.trace('foo')).toBeUndefined();
		expect(noopLogger.info('foo')).toBeUndefined();
		expect(noopLogger.warning('foo')).toBeUndefined();
		expect(noopLogger.error('foo')).toBeUndefined();

		expect(consoleLogSpy).not.toHaveBeenCalled();
		expect(consoleInfoSpy).not.toHaveBeenCalled();
		expect(consoleDebugSpy).not.toHaveBeenCalled();
		expect(consoleWarningSpy).not.toHaveBeenCalled();
		expect(consoleErrorSpy).not.toHaveBeenCalled();
	});
});
