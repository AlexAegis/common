import type { LogLevel } from './log-level.js';

export type Logger = (message: string) => void;
export type LoggerWithLogLevel = (message: string, logLevel?: LogLevel) => void;

export interface Loggers {
	logLevel: LogLevel;
	log: LoggerWithLogLevel;
	trace: Logger;
	info: Logger;
	warning: Logger;
	error: Logger;
}
