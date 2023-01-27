import { LogLevel } from './log-level.js';
import type { Loggers } from './logger.interface.js';

export const noopLogger: Loggers = {
	logLevel: LogLevel.ERROR,
	trace: (_message: string) => undefined,
	info: (_message: string) => undefined,
	warning: (_message: string) => undefined,
	error: (_message: string) => undefined,
	log: (_message: string, _logLevel?: LogLevel) => undefined,
};
