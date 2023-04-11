import type { Dependency } from '@schemastore/package';
import { describe, expect, it } from 'vitest';
import { mergeDependencies } from './merge-dependencies.function.js';

describe('mergeDependencies', () => {
	it('should be able to retain keys from both dependencies object', () => {
		const a: Dependency = {
			foo: '1.0.0',
		};
		const b: Dependency = {
			bar: '1.0.0',
		};

		const expected: Dependency = {
			foo: '1.0.0',
			bar: '1.0.0',
		};

		const result = mergeDependencies(a, b);
		expect(result).toEqual(expected);
	});

	it('should prefer workspace versions', () => {
		const a: Dependency = {
			foo: '1.0.0',
		};
		const b: Dependency = {
			foo: 'workspace:^',
		};

		const expected: Dependency = {
			foo: 'workspace:^',
		};

		const result = mergeDependencies(a, b);
		expect(result).toEqual(expected);
	});
});
