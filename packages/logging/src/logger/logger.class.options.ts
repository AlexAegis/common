import { LogLevel } from './log-level.js';

export interface LoggerOptions {
	/**
	 * The name of the domain where this logger is used. It's used as a prefix
	 * in log messages
	 */
	domain: string;
	/**
	 * The minimum loglevel logs that will be displayed. For example if `logLevel` is set to
	 * `LogLevel.WARNING`, no normal logs will be shown, only warnings and errors.
	 */
	logLevel?: LogLevel;
}

export type NormalizedLoggerOptions = Required<LoggerOptions>;

export const normalizeLoggerOptions = (options: LoggerOptions): NormalizedLoggerOptions => {
	return {
		logLevel: options.logLevel ?? LogLevel.INFO,
		domain: options.domain,
	};
};
