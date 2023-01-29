import { describe, expect, it } from 'vitest';
import { dry } from './dry.function.js';

describe('dry', () => {
	it('should return undefined by default', async () => {
		expect(await dry()).toBeUndefined();
	});

	it('should return what you pass to it otherwise', async () => {
		const foo = 'foo';
		expect(await dry(foo)).toBe(foo);
	});
});
