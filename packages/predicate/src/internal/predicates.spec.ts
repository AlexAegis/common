import { describe, expect, it } from 'vitest';
import { and, contains, equal, matchRegExp, not, or } from './predicates.js';

describe('predicates', () => {
	describe('equal', () => {
		it('should create a predicate that return true for equality', () => {
			const assertion = equal('foo');
			expect(assertion('foo')).toBeTruthy();
		});

		it('should create a predicate that return false when it does not equal', () => {
			const assertion = equal('foo');
			expect(assertion('bar')).toBeFalsy();
		});
	});

	describe('contains', () => {
		it('should create a predicate that returns true when includes returns true', () => {
			const assertion = contains('f');
			expect(assertion('foo')).toBeTruthy();
		});

		it('should create a predicate that returns false when the value does not include the criteria', () => {
			const assertion = contains('f');
			expect(assertion('bar')).toBeFalsy();
		});
	});

	describe('not', () => {
		it('should negate other operators, a matching equal should return false', () => {
			const assertion = not(equal('foo'));
			expect(assertion('foo')).toBeFalsy();
		});

		it('should negate other operators, a non matching equal should return true', () => {
			const assertion = not(equal('foo'));
			expect(assertion('bar')).toBeTruthy();
		});
	});

	describe('and', () => {
		it('should and together other operators, return true only when all matches', () => {
			const assertion = and(equal('foo'), contains('fo'));
			expect(assertion('foo')).toBeTruthy();
		});

		it('should and together other operators, return false only when any fails to match', () => {
			const assertion = and(equal('bar'), contains('fo'));
			expect(assertion('bar')).toBeFalsy();
		});
	});

	describe('or', () => {
		it('should or together other operators, return true when any matches', () => {
			const assertion = or(equal('null'), contains('fo'));
			expect(assertion('foo')).toBeTruthy();
		});

		it('should or together other operators, return false when none matches', () => {
			const assertion = or(equal('null'), contains('fo'));
			expect(assertion('bar')).toBeFalsy();
		});
	});

	describe('matchRegExp', () => {
		it('should return true when the criteria regexp matches', () => {
			const assertion = matchRegExp(/fo.*/);
			expect(assertion('foo')).toBeTruthy();
		});

		it('should return false when the criteria regexp does not match', () => {
			const assertion = matchRegExp(/fo.*/);
			expect(assertion('bar')).toBeFalsy();
		});
	});

	describe('more complex usecases', () => {
		it('should be able to nest predicates deeply', () => {
			const predicate = or(and(contains('fo'), contains('oo')), equal('bar'));
			expect(predicate('foo')).toBeTruthy();
			expect(predicate('bar')).toBeTruthy();
			expect(predicate('zed')).toBeFalsy();
		});
	});
});
