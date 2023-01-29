import { describe, expect, it } from 'vitest';
import { noopMap } from './noop-map.function.js';

describe('noopMap', () => {
	it('should return undefined by default', () => {
		expect(noopMap()).toBeUndefined();
	});

	it('should return what you pass to it otherwise', () => {
		const foo = 'foo';
		expect(noopMap(foo)).toBe(foo);
	});
});
