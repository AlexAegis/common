import { normalizeDryOption, type DryOption } from '@alexaegis/common';

export interface WriteJsonOptions extends DryOption {
	/**
	 * Formats the json file using prettier and your configuration.
	 *
	 * Disable if you don't have prettier
	 *
	 * @defaultValue true
	 */
	autoPrettier?: boolean;
}

export type NormalizedWriteJsonOptions = Required<WriteJsonOptions>;

export const normalizeWriteJsonOptions = (
	options?: WriteJsonOptions
): NormalizedWriteJsonOptions => {
	return {
		...normalizeDryOption(options),
		autoPrettier: options?.autoPrettier ?? true,
	};
};
