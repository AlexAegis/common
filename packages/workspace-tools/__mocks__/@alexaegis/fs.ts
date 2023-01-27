import { vi } from 'vitest';
import type { PackageJson } from '../../src/const/package-json.interface.js';

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

export const normalizeCwdOption = await vi
	.importActual<typeof import('@alexaegis/fs')>('@alexaegis/fs')
	.then((m) => m.normalizeCwdOption);

export const readJson = mockReadJson;
export const readYaml = mockReadYaml;
