import { describe, expect, it } from 'vitest';
import {
	MockLogger,
	mockTsLogAttachTransport,
	mockTsLogDebug,
	mockTsLogError,
	mockTsLogFatal,
	mockTsLogGetSubLogger,
	mockTsLogInfo,
	mockTsLogLog,
	mockTsLogSilly,
	mockTsLogTrace,
	mockTsLogWarn,
} from './mocks.js';

describe('mocks', () => {
	it('should exist', () => {
		const mockLogger = new MockLogger();
		expect(mockLogger.attachTransport).toBeDefined();
		expect(mockLogger.debug).toBeDefined();
		expect(mockLogger.error).toBeDefined();
		expect(mockLogger.fatal).toBeDefined();
		expect(mockLogger.getSubLogger).toBeDefined();
		expect(mockLogger.info).toBeDefined();
		expect(mockLogger.log).toBeDefined();
		expect(mockLogger.silly).toBeDefined();
		expect(mockLogger.trace).toBeDefined();
		expect(mockLogger.warn).toBeDefined();

		expect(mockTsLogSilly()).toBeUndefined();
		expect(mockTsLogTrace()).toBeUndefined();
		expect(mockTsLogDebug()).toBeUndefined();
		expect(mockTsLogLog()).toBeUndefined();
		expect(mockTsLogInfo()).toBeUndefined();
		expect(mockTsLogWarn()).toBeUndefined();
		expect(mockTsLogFatal()).toBeUndefined();
		expect(mockTsLogError()).toBeUndefined();
		expect(mockTsLogAttachTransport()).toBeUndefined();
		expect(mockTsLogGetSubLogger()).toBeUndefined();
	});
});
