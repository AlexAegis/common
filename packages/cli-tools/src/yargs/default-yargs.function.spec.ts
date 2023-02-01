import { beforeEach, describe, expect, it, SpyInstance, vi } from 'vitest';
import yargs, { Argv } from 'yargs';
import { defaultYargs } from './default-yargs.function.js';

describe('defaultYargs', () => {
	let yargsInstance!: Argv;
	let versionSpy: SpyInstance;
	let epilogueSpy: SpyInstance;

	beforeEach(() => {
		yargsInstance = yargs([]);
		versionSpy = vi.spyOn(yargsInstance, 'version');
		epilogueSpy = vi.spyOn(yargsInstance, 'epilogue');
	});

	it('should be fully filled from a filled packageJson file where the repository field is an object', async () => {
		const yarguments = defaultYargs(yargsInstance, {
			name: 'name',
			version: '1',
			description: 'descriptions',
			repository: { url: 'homepage' },
		});

		const args = await yarguments.parseAsync();

		expect(args).toBeDefined();
		expect(versionSpy).toHaveBeenCalledOnce();
		expect(epilogueSpy).toHaveBeenCalledOnce();
	});

	it('should be fully filled from a filled packageJson file where the repository is a string', async () => {
		const args = await defaultYargs(yargsInstance, {
			name: 'name',
			version: '1',
			description: 'descriptions',
			repository: 'homepage',
		}).parseAsync();

		expect(args).toBeDefined();
		expect(versionSpy).toHaveBeenCalledOnce();
		expect(epilogueSpy).toHaveBeenCalledOnce();
	});

	it('should be working from an empty packageJson file', async () => {
		const args = await defaultYargs(yargsInstance).parseAsync();

		expect(args).toBeDefined();
		expect(versionSpy).not.toHaveBeenCalledOnce();
		expect(epilogueSpy).not.toHaveBeenCalledOnce();
	});
});
