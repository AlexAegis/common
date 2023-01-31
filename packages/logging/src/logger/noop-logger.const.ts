import { Logger } from 'tslog';
import { LogLevel } from './log-level.enum.js';

/**
 * Acts as the default logger that does not do anything.
 */
export const noopLogger = new Logger({ type: 'hidden', minLevel: LogLevel.OFF });
