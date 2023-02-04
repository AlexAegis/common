import type { ObjectKeyOrder } from '@alexaegis/common';
import { describe, expect, it } from 'vitest';
import { normalizeSortingPreferenceForPackageJson } from './normalize-sorting-preference-for-package-json.function.js';

describe('normalizeSortingPreferenceForPackageJson', () => {
	it('should add it even to empty sorting preferences', () => {
		const sortingPreference: ObjectKeyOrder = [];
		const expectedSortingPreference: ObjectKeyOrder = [
			{ key: 'exports', order: [{ key: '.*', order: ['types'] }] },
		];
		const result = normalizeSortingPreferenceForPackageJson(sortingPreference);
		expect(result).toEqual(expectedSortingPreference);
	});

	it('should override existing preferences if it is non-comforming', () => {
		const sortingPreference: ObjectKeyOrder = ['exports'];
		const expectedSortingPreference: ObjectKeyOrder = [
			{
				key: 'exports',
				order: [{ key: '.*', order: ['types'] }],
			},
		];
		const result = normalizeSortingPreferenceForPackageJson(sortingPreference);
		expect(result).toEqual(expectedSortingPreference);
	});

	it('should override existing preferences if it is non-comforming at exports level', () => {
		const sortingPreference: ObjectKeyOrder = [
			{ key: 'dependencies', order: ['a', 'b'] },
			{ key: 'exports', order: ['something'] },
		];
		const expectedSortingPreference: ObjectKeyOrder = [
			{ key: 'dependencies', order: ['a', 'b'] },
			{
				key: 'exports',
				order: [
					{ key: 'something', order: ['types'] },
					{ key: '.*', order: ['types'] },
				],
			},
		];
		const result = normalizeSortingPreferenceForPackageJson(sortingPreference);
		expect(result).toEqual(expectedSortingPreference);
	});

	it('should override existing preferences if it is non-comforming at the last level because types is not present at all', () => {
		const sortingPreference: ObjectKeyOrder = [
			{ key: 'exports', order: [{ key: '.*', order: ['nope'] }] },
		];
		const expectedSortingPreference: ObjectKeyOrder = [
			{ key: 'exports', order: [{ key: '.*', order: ['types', 'nope'] }] },
		];
		const result = normalizeSortingPreferenceForPackageJson(sortingPreference);
		expect(result).toEqual(expectedSortingPreference);
	});

	it('should override existing preferences if it is non-comforming at the last level because types is at the wrong place', () => {
		const sortingPreference: ObjectKeyOrder = [
			{ key: 'exports', order: [{ key: '.*', order: ['nope', 'types'] }] },
		];
		const expectedSortingPreference: ObjectKeyOrder = [
			{ key: 'exports', order: [{ key: '.*', order: ['types', 'nope'] }] },
		];
		const result = normalizeSortingPreferenceForPackageJson(sortingPreference);
		expect(result).toEqual(expectedSortingPreference);
	});

	it('should override existing preferences if it is non-comforming at the last level and types is specified as an object', () => {
		const sortingPreference: ObjectKeyOrder = [
			{
				key: 'exports',
				order: [{ key: '.*', order: ['nope', { key: 'types', order: [] }] }],
			},
		];
		const expectedSortingPreference: ObjectKeyOrder = [
			{
				key: 'exports',
				order: [{ key: '.*', order: [{ key: 'types', order: [] }, 'nope'] }],
			},
		];
		const result = normalizeSortingPreferenceForPackageJson(sortingPreference);
		expect(result).toEqual(expectedSortingPreference);
	});
});
