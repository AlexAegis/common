import { describe, expect, it } from 'vitest';

describe('mergeWorkspaceLcovReportsShim', () => {
	it('should exist', async () => {
		const mod = await import('../../shims/merge-workspace-lcov-reports.mjs');
		expect(mod).toBeDefined();
	});
});
