import { isObject } from './is-object.function.js';
import type { Struct } from './struct.type.js';

export const deepMerge = <T, S extends unknown[]>(target: T, ...sources: S): T & S => {
	if (sources.length === 0) {
		return target as T & S;
	}
	const source = sources.shift();

	if (isObject(target) && isObject(source)) {
		for (const key in source) {
			if (isObject(source[key])) {
				if (!target[key]) {
					Object.assign(target, { [key]: {} });
				}
				deepMerge(target[key] as Struct, source[key] as Struct);
			} else {
				Object.assign(target, { [key]: source[key] });
			}
		}
	}

	return deepMerge(target, ...sources);
};
