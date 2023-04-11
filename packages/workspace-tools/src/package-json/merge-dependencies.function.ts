import type { Dependency } from '@schemastore/package';
import { getLargestVersion } from './get-largest-version.function.js';

export const mergeDependencies = (a: Dependency = {}, b: Dependency = {}): Dependency => {
	const keys = [...new Set([...Object.keys(a), ...Object.keys(b)])];
	return keys.reduce<Dependency>((acc, key) => {
		acc[key] = getLargestVersion(a[key], b[key]);
		return acc;
	}, {});
};
