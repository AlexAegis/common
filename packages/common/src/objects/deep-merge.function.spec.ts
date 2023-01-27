import { describe, expect, it } from 'vitest';
import { deepMerge } from './deep-merge.function.js';

describe('deepMerge', () => {
	it('should be able to merge multiple shallow objects and mutate the target', () => {
		const target = { a: 'a' };
		const source1 = { b: 'b' };
		const source2 = { c: 'c' };

		const result = deepMerge(target, source1, source2);
		const expected = { a: 'a', b: 'b', c: 'c' };

		expect(result).toEqual(expected);
		expect(result).toBe(target);
	});

	it('should be able to merge deeper objects and mutate the target', () => {
		const target = { a: 'a', deep: { foo: 'foo' } };
		const source1 = { b: 'b', another: {} };
		const source2 = { c: 'c', deep: { bar: 'bar' } };

		const result = deepMerge(target, source1, source2);
		const expected = { a: 'a', b: 'b', c: 'c', deep: { foo: 'foo', bar: 'bar' }, another: {} };

		expect(result).toEqual(expected);
		expect(result).toBe(target);
	});
});
