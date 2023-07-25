import { describe, expect, it } from 'vitest';
import { random, randomInt } from './random.function.js';

describe('random functions', () => {
	const low = 3;
	const high = 12;

	describe('random float', () => {
		it('should return a number within a range', () => {
			const result = random(low, high);
			expect(result).toBeTypeOf('number');
			expect(result).to.be.lessThanOrEqual(high);
			expect(result).to.be.greaterThanOrEqual(low);
		});
	});

	describe('random int', () => {
		it('should return a number within a range that is an integer', () => {
			const result = randomInt(low, high);
			expect(result).toBeTypeOf('number');
			expect(result).to.be.lessThanOrEqual(high);
			expect(result).to.be.greaterThanOrEqual(low);
			expect(result).toEqual(Math.floor(result));
		});
	});
});
