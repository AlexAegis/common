import type { LogLevel } from './log-level.js';

export type Log = (message: string) => void;
export type LogWithLogLevel = (message: string, logLevel?: LogLevel) => void;

export interface LoggerLike {
	log: LogWithLogLevel;
	debug: Log;
	info: Log;
	warning: Log;
	error: Log;
}
