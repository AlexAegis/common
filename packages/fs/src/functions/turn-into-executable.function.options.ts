import { LoggerOption, NormalizedLoggerOption, normalizeLoggerOption } from '@alexaegis/logging';
import { CwdOption, normalizeCwdOption, NormalizedCwdOption } from './cwd.option.js';

export type TurnIntoExecutableOptions = CwdOption & LoggerOption;
export type NormalizedTurnIntoExecutableOptions = NormalizedCwdOption & NormalizedLoggerOption;

export const normalizeTurnIntoExecutableOptions = (
	options?: TurnIntoExecutableOptions
): NormalizedTurnIntoExecutableOptions => {
	return {
		...normalizeCwdOption(options),
		...normalizeLoggerOption(options),
	};
};
