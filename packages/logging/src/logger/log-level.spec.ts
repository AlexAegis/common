import { describe, expect, it } from 'vitest';
import { isLogLevel, isLogLevelWithinTreshold, LogLevel } from './log-level.js';

describe('LogLevel', () => {
	describe('isLogLevel', () => {
		it('return true for all LogLevels', () => {
			for (const logLevel of Object.values(LogLevel)) {
				expect(isLogLevel(logLevel)).toBeTruthy();
			}
		});

		it('should return false for other strings', () => {
			expect(isLogLevel('foo')).toBeFalsy();
			expect(isLogLevel('bar')).toBeFalsy();
		});
	});

	describe('isLogLevelWithinTreshold', () => {
		it('should return true for equal logLevels', () => {
			for (const logLevel of Object.values(LogLevel)) {
				expect(isLogLevelWithinTreshold(logLevel, logLevel)).toBeTruthy();
			}
		});

		it('should return true when a logLevel is stronger than the treshold', () => {
			expect(isLogLevelWithinTreshold(LogLevel.TRACE, LogLevel.TRACE)).toBeTruthy();
			expect(isLogLevelWithinTreshold(LogLevel.INFO, LogLevel.TRACE)).toBeTruthy();
			expect(isLogLevelWithinTreshold(LogLevel.WARNING, LogLevel.TRACE)).toBeTruthy();
			expect(isLogLevelWithinTreshold(LogLevel.ERROR, LogLevel.TRACE)).toBeTruthy();

			expect(isLogLevelWithinTreshold(LogLevel.TRACE, LogLevel.INFO)).toBeFalsy();
			expect(isLogLevelWithinTreshold(LogLevel.INFO, LogLevel.INFO)).toBeTruthy();
			expect(isLogLevelWithinTreshold(LogLevel.WARNING, LogLevel.INFO)).toBeTruthy();
			expect(isLogLevelWithinTreshold(LogLevel.ERROR, LogLevel.INFO)).toBeTruthy();

			expect(isLogLevelWithinTreshold(LogLevel.TRACE, LogLevel.WARNING)).toBeFalsy();
			expect(isLogLevelWithinTreshold(LogLevel.INFO, LogLevel.WARNING)).toBeFalsy();
			expect(isLogLevelWithinTreshold(LogLevel.WARNING, LogLevel.WARNING)).toBeTruthy();
			expect(isLogLevelWithinTreshold(LogLevel.ERROR, LogLevel.WARNING)).toBeTruthy();

			expect(isLogLevelWithinTreshold(LogLevel.TRACE, LogLevel.ERROR)).toBeFalsy();
			expect(isLogLevelWithinTreshold(LogLevel.INFO, LogLevel.ERROR)).toBeFalsy();
			expect(isLogLevelWithinTreshold(LogLevel.WARNING, LogLevel.ERROR)).toBeFalsy();
			expect(isLogLevelWithinTreshold(LogLevel.ERROR, LogLevel.ERROR)).toBeTruthy();

			expect(isLogLevelWithinTreshold(LogLevel.TRACE, LogLevel.SILENT)).toBeFalsy();
			expect(isLogLevelWithinTreshold(LogLevel.INFO, LogLevel.SILENT)).toBeFalsy();
			expect(isLogLevelWithinTreshold(LogLevel.WARNING, LogLevel.SILENT)).toBeFalsy();
			expect(isLogLevelWithinTreshold(LogLevel.ERROR, LogLevel.SILENT)).toBeFalsy();
		});
	});
});
