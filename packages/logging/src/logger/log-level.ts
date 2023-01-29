export enum LogLevel {
	DEBUG = 'DEBUG',
	INFO = 'INFO',
	WARNING = 'WARN',
	/**
	 * Alias for WARN
	 */
	QUIET = 'WARN',
	ERROR = 'ERROR',
	/**
	 * No logging happens
	 */
	OFF = 'OFF',
	/**
	 * Alias for OFF, No logging happens
	 */
	SILENT = 'OFF',
}

export const longestLogLevelNameLength = Object.values(LogLevel)
	.map((logLevel) => logLevel.length)
	.reduce((acc, next) => (next > acc ? next : acc), 0);

export const isLogLevel = (rawLogLevel: string): rawLogLevel is LogLevel => {
	return Object.values(LogLevel).some((logLevel) => logLevel.toString() === rawLogLevel);
};

export const logLevelStrength: Record<LogLevel, number> = {
	DEBUG: 1,
	INFO: 2,
	WARN: 3,
	ERROR: 4,
	OFF: 5,
	// TODO: Remove this once this is resolved https://github.com/bcoe/c8/issues/434
	/* c8 ignore next */
};

export const isLogLevelWithinTreshold = (logLevel: LogLevel, treshold: LogLevel): boolean => {
	return logLevelStrength[logLevel] >= logLevelStrength[treshold];
};
