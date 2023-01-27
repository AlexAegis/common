import { dry } from '@alexaegis/common';
import { cyan, green, lightYellow, red, yellow } from 'kolorist';
import {
	CreateLoggerOptions,
	normalizeCreateLoggerOptions,
} from './create-logger.function.options.js';
import { isLogLevelWithinTreshold, LogLevel, longestLogLevelNameLength } from './log-level.js';
import type { Logger, Loggers } from './logger.interface.js';

export const createLogger = (rawOptions: CreateLoggerOptions): Loggers => {
	const options = normalizeCreateLoggerOptions(rawOptions);

	const prefix = (message: string, logLevel: LogLevel) =>
		cyan(
			`[${options.prefix}:${logLevel.toString().padStart(longestLogLevelNameLength)}] ${green(
				message
			)}`
		);
	const prefixWarning = (message: string) =>
		yellow(
			`[${options.prefix}:${LogLevel.WARNING.padStart(
				longestLogLevelNameLength
			)}] ${lightYellow(message)}`
		);

	const prefixError = (message: string) =>
		red(
			`[${options.prefix}:${LogLevel.ERROR.padStart(longestLogLevelNameLength)}] ${yellow(
				message
			)}`
		);

	const loggerMap: Record<LogLevel, Logger> = {
		ERROR: (message: string): void => console.error(prefixError(message)),
		WARN: (message: string): void => console.warn(prefixWarning(message)),
		INFO: (message: string): void => console.info(prefix(message, LogLevel.INFO)),
		TRACE: (message: string): void => console.info(prefix(message, LogLevel.TRACE)),
		OFF: (_message: string): void => undefined,
	};

	return {
		logLevel: options.logLevel,
		log: (message: string, logLevel: LogLevel = LogLevel.INFO) => {
			if (isLogLevelWithinTreshold(logLevel, options.logLevel)) {
				loggerMap[logLevel](message);
			}
		},
		trace: isLogLevelWithinTreshold(LogLevel.TRACE, options.logLevel)
			? loggerMap[LogLevel.TRACE]
			: dry,
		info: isLogLevelWithinTreshold(LogLevel.INFO, options.logLevel)
			? loggerMap[LogLevel.INFO]
			: dry,
		warning: isLogLevelWithinTreshold(LogLevel.WARNING, options.logLevel)
			? loggerMap[LogLevel.WARNING]
			: dry,
		error: isLogLevelWithinTreshold(LogLevel.ERROR, options.logLevel)
			? loggerMap[LogLevel.ERROR]
			: dry,
	};
};
