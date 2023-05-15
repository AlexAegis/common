import { isNotNullish, type Nullable } from '@alexaegis/common';

/**
 * The archetypical description of a project present in the "archetype" field
 * of the package.json. It's not the full description as other package.json
 * fields can be read, most notably the "private" field dictates if a package
 * is to be published or not. That information is not duplicated.
 *
 * node-app
 * node-lib
 * web-svelte-app
 * web-svelte-lib
 */
export interface PackageArchetype {
	platform?: Nullable<'node' | 'web'>;

	/**
	 * @example 'node' | 'svelte' | 'angular'
	 */
	framework?: Nullable<string>;

	/**
	 * @example 'ts' | 'js'
	 */
	language?: Nullable<string>;

	kind?: Nullable<'app' | 'lib'>;

	/**
	 * @example 'vite' | 'rollup'
	 */
	bundler?: Nullable<string>;

	/**
	 * @example 'vitest' | 'jest' | 'mocha'
	 */
	testing?: Nullable<string>;

	/**
	 * You can disable specific setup plugins if you wish to skip them in a
	 * specific package, even if it would otherwise match the rest of the
	 * archetype.
	 *
	 * Like define `["@alexaegis/autotool-plugin-vitest"]` if you don't want it
	 * to be applied.
	 *
	 * Each treated as a RegExp
	 */
	disabledPlugins?: string[];
}

/**
 * This will return names for when you want to denote the archetype in a
 * filename: `tsconfig.web-svelte-lib.json` or `tsconfig.node-lib.json`
 */
export const getEncodedArchetype = (archetype?: PackageArchetype | undefined): string => {
	if (!archetype) {
		return '';
	}

	const orderedValues: Nullable<string>[] = [
		archetype.platform,
		archetype.framework,
		archetype.language,
		archetype.kind,
		archetype.bundler,
		archetype.testing,
	];

	return orderedValues.filter(isNotNullish).join('-');
};
