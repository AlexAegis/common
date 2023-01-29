import { getWorkspaceRoot } from '@alexaegis/workspace-tools';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { LCOV_INFO_FILE_NAME } from '../index.js';
import { mergeLcovReportsInWorkspace } from '../lcov/merge-lcov-reports-in-workspace.function.js';

const mergeWorkspaceLcovReports = async () => {
	const workspaceRoot = getWorkspaceRoot();

	if (workspaceRoot) {
		const mergedLcov = await mergeLcovReportsInWorkspace({ skipWorkspaceRoot: true });
		await mkdir(join(workspaceRoot, 'coverage'), { recursive: true });
		await writeFile(join(workspaceRoot, 'coverage', LCOV_INFO_FILE_NAME), mergedLcov);
	} else {
		console.error('Not in a workspace!');
		// eslint-disable-next-line unicorn/no-process-exit
		process.exit(1);
	}
};

(async () => await mergeWorkspaceLcovReports())();
