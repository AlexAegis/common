import { describe, expect, it } from 'vitest';
import { noop } from './noop.function.js';

describe('noop', () => {
	it('should return undefined', () => {
		expect(noop()).toBeUndefined();
	});
});
