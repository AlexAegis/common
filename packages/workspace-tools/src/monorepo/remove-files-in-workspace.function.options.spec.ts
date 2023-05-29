import { noopLogger } from '@alexaegis/logging';
import { describe, expect, it, vi } from 'vitest';
import {
	normalizeRemoveFilesInWorkspaceOptions,
	type NormalizedRemoveFilesInWorkspaceOptions,
	type RemoveFilesInWorkspaceOptions,
} from './remove-files-in-workspace.function.options.js';

const mockCwd = '/foo/bar';

vi.spyOn(process, 'cwd').mockReturnValue(mockCwd);

describe('normalizeRemoveFilesInWorkspaceOptions', () => {
	const defaultOptions: NormalizedRemoveFilesInWorkspaceOptions = {
		cwd: mockCwd,
		dependencyCriteria: [],
		keywordCriteria: [],
		dry: false,
		safe: false,
		logger: noopLogger,
		onlyWorkspaceRoot: false,
		skipWorkspaceRoot: false,
		filter: [],
	};

	it('should have a default when not defined', () => {
		expect(normalizeRemoveFilesInWorkspaceOptions()).toEqual(defaultOptions);
	});

	it('should use the provided values when defined', () => {
		const manualOptions: RemoveFilesInWorkspaceOptions = {
			dry: true,
			safe: true,
		};
		expect(normalizeRemoveFilesInWorkspaceOptions(manualOptions)).toEqual({
			...defaultOptions,
			...manualOptions,
		});
	});
});
