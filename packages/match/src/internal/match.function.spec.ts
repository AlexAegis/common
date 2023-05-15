import { describe, expect, it } from 'vitest';
import { match, type JsonMatcher } from './match.function.js';

describe('match', () => {
	describe('strings', () => {
		it('should match the same string to itself', () => {
			expect(match('foo', 'foo')).toBeTruthy();
		});

		it('should not match different strings', () => {
			expect(match('foo', 'bar')).toBeFalsy();
		});

		it('should be able to match using regexes', () => {
			expect(match('foo', /fo+/)).toBeTruthy();
		});
	});

	describe('matching using custom functions', () => {
		it('should be able to match anything using a function', () => {
			expect(
				match({ foo: 'foo' }, { foo: (v) => v?.toString().startsWith('f') ?? false })
			).toBeTruthy();
		});
	});

	describe('nullish values', () => {
		it('should match undefined to both undefined and null', () => {
			expect(match(undefined, undefined)).toBeTruthy();
			// eslint-disable-next-line unicorn/no-null
			expect(match(null, undefined)).toBeTruthy();
		});

		it('should null should match to both undefined and null', () => {
			// eslint-disable-next-line unicorn/no-null
			expect(match(undefined, null)).toBeFalsy();
			// eslint-disable-next-line unicorn/no-null
			expect(match(null, null)).toBeTruthy();
		});
	});

	describe('booleans', () => {
		it('should be able to match booleans', () => {
			expect(match(true, true)).toBeTruthy();
		});

		it('should not match different booleans', () => {
			expect(match(true, false)).toBeFalsy();
			expect(match(false, true)).toBeFalsy();
		});

		it('should not match different booleans', () => {
			expect(match(true, false)).toBeFalsy();
			expect(match(false, true)).toBeFalsy();
		});

		it('should be able to match nested booleans', () => {
			expect(
				match(
					{
						foo: true,
					},
					{
						foo: true,
					}
				)
			).toBeTruthy();
		});

		it('should not match different nested booleans', () => {
			expect(
				match(
					{
						foo: true,
					},
					{
						foo: false,
					}
				)
			).toBeFalsy();
		});
	});

	describe('arrays', () => {
		it('should match an array if every element of it is matching', () => {
			expect(match([1, 2, 3], [1, 2, 3])).toBeTruthy();
		});

		it('should match an two empty arrays', () => {
			expect(match([], [])).toBeTruthy();
		});

		it('should fail when trying to match a non-array to an array', () => {
			expect(match(1, [])).toBeFalsy();
		});
	});

	describe('objects', () => {
		it('should match with itself', () => {
			const target = {
				foo: 'foo',
			};

			const result = match(target, target);

			expect(result).toBeTruthy();
		});

		it('should match using a regex', () => {
			const target = {
				foo: 'foo',
			};

			const filter = {
				foo: /^foo$/,
			};
			const result = match(target, filter);

			expect(result).toBeTruthy();
		});

		it('should allow extra keys by default', () => {
			const target = {
				foo: 'foo',
				extra: 'key',
			};

			const filter = {
				foo: /^foo$/,
			};
			const result = match(target, filter);

			expect(result).toBeTruthy();
		});

		it('should match with multiple types that are nested', () => {
			const target = {
				foo: 'foo',
				bar: {
					zed: 1,
					arr: [4, 3, 'ice', 'fire'],
				},
			};

			const filter: JsonMatcher = {
				foo: /^foo$/,
				bar: {
					zed: 1,
					arr: [
						(i) => typeof i === 'number' && i % 2 === 0,
						3,
						(value) => value === 'ice',
						'fire',
					],
				},
			};
			const result = match(target, filter);

			expect(result).toBeTruthy();
		});

		it('should not match if one propery is not matching', () => {
			const target = {
				foo: 'foo',
				bar: 'foo',
			};

			const filter = {
				foo: /^foo$/,
				bar: /^bar$/,
			};
			const result = match(target, filter);

			expect(result).toBeFalsy();
		});

		it('should match an undefined when a field is not defined', () => {
			const target = {};

			const result = match(target, {
				foo: undefined,
			} as unknown as JsonMatcher);

			expect(result).toBeTruthy();
		});
	});
});
