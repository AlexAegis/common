import { vi } from 'vitest';
import type { PackageJson } from '../../src/const/package-json.interface.js';

// TODO: Explore if this file could be predefined in the fs package
// ! This file isnt being read by vitest for some reason
export const mockReadJson = vi.fn<[string | undefined], Promise<unknown>>(async (path) => {
	if (path?.endsWith('package.json')) {
		return {} as PackageJson;
	} else {
		return undefined;
	}
});

export const mockReadYaml = vi.fn<[string | undefined], Promise<unknown>>(async (path) => {
	if (path?.endsWith('pnpm-workspace.yaml')) {
		return {
			packages: ['packages/*'],
		};
	} else {
		return undefined;
	}
});

export const readJson = mockReadJson;
export const readYaml = mockReadYaml;
