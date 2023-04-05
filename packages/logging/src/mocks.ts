import { vi } from 'vitest';

export const mockTsLogSilly: ReturnType<typeof vi.fn> = vi.fn();
export const mockTsLogTrace: ReturnType<typeof vi.fn> = vi.fn();
export const mockTsLogDebug: ReturnType<typeof vi.fn> = vi.fn();
export const mockTsLogLog: ReturnType<typeof vi.fn> = vi.fn();
export const mockTsLogInfo: ReturnType<typeof vi.fn> = vi.fn();
export const mockTsLogWarn: ReturnType<typeof vi.fn> = vi.fn();
export const mockTsLogFatal: ReturnType<typeof vi.fn> = vi.fn();
export const mockTsLogError: ReturnType<typeof vi.fn> = vi.fn();
export const mockTsLogAttachTransport: ReturnType<typeof vi.fn> = vi.fn();
export const mockTsLogGetSubLogger: ReturnType<typeof vi.fn> = vi.fn();

export class MockLogger {
	silly: ReturnType<typeof vi.fn> = mockTsLogSilly;
	trace: ReturnType<typeof vi.fn> = mockTsLogTrace;
	debug: ReturnType<typeof vi.fn> = mockTsLogDebug;
	log: ReturnType<typeof vi.fn> = mockTsLogLog;
	info: ReturnType<typeof vi.fn> = mockTsLogInfo;
	warn: ReturnType<typeof vi.fn> = mockTsLogWarn;
	fatal: ReturnType<typeof vi.fn> = mockTsLogFatal;
	error: ReturnType<typeof vi.fn> = mockTsLogError;
	attachTransport: ReturnType<typeof vi.fn> = mockTsLogAttachTransport;
	getSubLogger: ReturnType<typeof vi.fn> = mockTsLogGetSubLogger;
}
