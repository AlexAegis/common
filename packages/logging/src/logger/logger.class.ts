import { cyan, green, lightYellow, red, yellow } from 'kolorist';
import { isLogLevelWithinTreshold, LogLevel, longestLogLevelNameLength } from './log-level.js';
import type { LoggerLike } from './logger-like.interface.js';
import {
	LoggerOptions,
	NormalizedLoggerOptions,
	normalizeLoggerOptions,
} from './logger.class.options.js';

export type Formatter = (message: string) => string;

export interface LogFormatter {
	domain: Formatter;
	message: Formatter;
}

export class Logger implements LoggerLike {
	options: NormalizedLoggerOptions;

	private colorScheme: Record<Exclude<LogLevel, LogLevel.OFF>, LogFormatter> = {
		ERROR: { domain: red, message: yellow },
		WARN: { domain: yellow, message: lightYellow },
		DEBUG: { domain: cyan, message: green },
		INFO: { domain: cyan, message: green },
	};

	static GLOBAL: Logger = new Logger({ domain: 'global', logLevel: LogLevel.DEBUG });
	static OFF: LoggerLike = {
		error: () => undefined,
		warning: () => undefined,
		info: () => undefined,
		debug: () => undefined,
		log: () => undefined,
	};

	constructor(rawOptions: LoggerOptions) {
		this.options = normalizeLoggerOptions(rawOptions);
	}

	setDomain(domain: string): void {
		this.options.domain = domain;
	}

	private format(message: string, logLevel: Exclude<LogLevel, LogLevel.OFF>): void {
		const colorScheme = this.colorScheme[logLevel];
		colorScheme.domain(
			`[${this.options.domain}:${logLevel
				.toString()
				.padStart(longestLogLevelNameLength)}] ${colorScheme.message(message)}`
		);
	}

	subDomain(domain: string): Logger {
		return new Logger({ ...this.options, domain: `${this.options.domain}:${domain}` });
	}

	log(message: string, logLevel?: LogLevel): void {
		switch (logLevel) {
			case LogLevel.INFO: {
				this.info(message);
				break;
			}
			case LogLevel.DEBUG: {
				this.debug(message);
				break;
			}
			case LogLevel.WARNING: {
				this.warning(message);
				break;
			}
			case LogLevel.ERROR: {
				this.error(message);
				break;
			}
			case LogLevel.OFF: {
				break;
			}
			default: {
				if (isLogLevelWithinTreshold(LogLevel.INFO, this.options.logLevel)) {
					// ? Some obfuscation so searching for console.log won't return this line
					console['log'](this.format(message, LogLevel.INFO));
				}
				break;
			}
		}
	}

	error(message: string): void {
		if (isLogLevelWithinTreshold(LogLevel.ERROR, this.options.logLevel)) {
			console.error(this.format(message, LogLevel.ERROR));
		}
	}

	warning(message: string): void {
		if (isLogLevelWithinTreshold(LogLevel.WARNING, this.options.logLevel)) {
			console.warn(this.format(message, LogLevel.WARNING));
		}
	}

	info(message: string): void {
		if (isLogLevelWithinTreshold(LogLevel.INFO, this.options.logLevel)) {
			console.info(this.format(message, LogLevel.INFO));
		}
	}

	debug(message: string): void {
		if (isLogLevelWithinTreshold(LogLevel.DEBUG, this.options.logLevel)) {
			console.info(this.format(message, LogLevel.DEBUG));
		}
	}
}
