import { join, normalize } from 'node:path/posix';
import { mockProjectRoot } from '../../../__mocks__/node:fs.js';

export const collectPackageJsonPathsUpDirectoryTree = (cwd: string = process.cwd()): string[] => {
	if (normalize(cwd) === mockProjectRoot) {
		return [mockProjectRoot];
	} else if (cwd.startsWith(mockProjectRoot)) {
		return [mockProjectRoot, join(mockProjectRoot, 'packages/zed')];
	} else {
		return [];
	}
};
