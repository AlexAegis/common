import type { LoggerLike } from './logger-like.interface.js';
import { Logger } from './logger.class.js';

export interface LoggerOption {
	/**
	 * An optional Logger target.
	 *
	 * @default Logger.OFF
	 */
	logger?: LoggerLike;
}

export type NormalizedLoggerOption = Required<LoggerOption>;

export const normalizeLoggerOption = (options?: LoggerOption): NormalizedLoggerOption => {
	return {
		logger: options?.logger ?? Logger.OFF,
	};
};
