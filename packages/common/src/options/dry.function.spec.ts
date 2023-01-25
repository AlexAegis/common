import { describe, expect, it } from 'vitest';
import { dry } from './dry.function.js';

describe('dry', () => {
	it('should return undefined', () => {
		expect(dry()).toBeUndefined();
	});
});
