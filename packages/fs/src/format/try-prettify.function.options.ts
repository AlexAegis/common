import type { BuiltInParserName } from 'prettier';
import { normalizeCwdOption, type CwdOption } from '../functions/cwd.option.js';

export interface PrettifyOptions extends CwdOption {
	/**
	 * Which prettier parser is used
	 *
	 * @defaultValue 'babel'
	 */
	parser?: BuiltInParserName;
}

export type NormalizedPrettifyOptions = Required<PrettifyOptions>;

export const normalizePrettifyOptions = (options?: PrettifyOptions): NormalizedPrettifyOptions => {
	return {
		...normalizeCwdOption(options),
		parser: options?.parser ?? 'babel',
	};
};
