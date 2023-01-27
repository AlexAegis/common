import { LogLevel } from './log-level.js';

export interface CreateLoggerOptions {
	logLevel?: LogLevel;
	prefix: string;
}

export type NormalizedCreateLoggerOptions = Required<CreateLoggerOptions>;

export const normalizeCreateLoggerOptions = (
	options: CreateLoggerOptions
): NormalizedCreateLoggerOptions => {
	return {
		logLevel: options.logLevel ?? LogLevel.INFO,
		prefix: options.prefix,
	};
};
