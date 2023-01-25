import { join } from 'node:path/posix';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { mockProjectRoot } from '../../__mocks__/node:fs.js';
import { getWorkspaceRoot } from './get-workspace-root.function.js';

describe('getWorkspaceRoot', () => {
	beforeAll(() => {
		vi.mock('./collect-package-json-paths-up-directory-tree.function.js');
	});

	afterAll(() => {
		vi.resetAllMocks();
	});

	it('should find nothing when not in a workspace', () => {
		const foundPackageJsons = getWorkspaceRoot(join(mockProjectRoot, '..'));
		expect(foundPackageJsons).toBeUndefined();
	});

	it('should find the workspace root when being directly in it', () => {
		const foundPackageJsons = getWorkspaceRoot(mockProjectRoot);
		expect(foundPackageJsons).toEqual(mockProjectRoot);
	});

	it('should find the workspace root when being inside in it', () => {
		const foundPackageJsons = getWorkspaceRoot(join(mockProjectRoot, 'packages'));
		expect(foundPackageJsons).toEqual(mockProjectRoot);
	});
});
