import { noopLogger } from '@alexaegis/logging';
import { describe, expect, it, vi } from 'vitest';
import {
	normalizeCollectWorkspacePackagesOptions,
	type CollectWorkspacePackagesOptions,
	type NormalizedCollectWorkspacePackagesOptions,
} from './collect-workspace-packages.function.options.js';

const mockCwd = '/cwd';
vi.spyOn(process, 'cwd').mockReturnValue(mockCwd);

describe('normalizeCollectWorkspacePackagesOptions', () => {
	it('should have a default when not defined', () => {
		expect(normalizeCollectWorkspacePackagesOptions()).toEqual({
			cwd: mockCwd,
			onlyWorkspaceRoot: false,
			skipWorkspaceRoot: false,
			dependencyCriteria: [],
			keywordCriteria: [],
			logger: noopLogger,
			filter: [],
		} as NormalizedCollectWorkspacePackagesOptions);
	});

	it('should use the provided values when defined', () => {
		const manualOptions: CollectWorkspacePackagesOptions = {
			cwd: '/foo/bar',
			onlyWorkspaceRoot: false,
			skipWorkspaceRoot: false,
			dependencyCriteria: ['dep'],
			keywordCriteria: [/key/],
			logger: noopLogger,
			filter: [],
		};
		expect(normalizeCollectWorkspacePackagesOptions(manualOptions)).toEqual({
			...manualOptions,
			dependencyCriteria: [/dep/],
		});
	});
});
