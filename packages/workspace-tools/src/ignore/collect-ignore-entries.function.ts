import { asyncFilterMap } from '@alexaegis/common';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { collectFileDirnamePathsUpDirectoryTree, getWorkspaceRoot } from '../index.js';
import {
	normalizeCollectIgnoreEntriesOptions,
	type CollectIgnoreEntriesOptions,
} from './collect-ignore-entries.function.options.js';
import { splitAndStripHashComments } from './parse-ignore-file.function.js';

/**
 * Collects every ignore entry within a workspace affecting cwd
 * It will only collect ignore
 *
 * @param rawOptions by default ignoreFile is `.gitignore`
 */
export const collectIgnoreEntries = async (
	rawOptions?: CollectIgnoreEntriesOptions,
): Promise<string[]> => {
	const options = normalizeCollectIgnoreEntriesOptions(rawOptions);
	console.log('options', options);
	const workspaceRoot = getWorkspaceRoot();

	if (!workspaceRoot) {
		throw new Error('Not in a workspace!');
	}

	const ignoreFileDirnames = collectFileDirnamePathsUpDirectoryTree(
		options.ignoreFileName,
		options,
	);
	console.log('ignoreFilePaths', ignoreFileDirnames);

	const ignoreFilePathsWithinWorkspace = ignoreFileDirnames
		.filter((ignoreFileDirname) => ignoreFileDirname.startsWith(workspaceRoot))
		.map((ignoreFileDirname) => join(ignoreFileDirname, options.ignoreFileName));

	const ignoreFileLines = await asyncFilterMap(
		ignoreFilePathsWithinWorkspace,
		async (ignoreFile) => {
			const gitIgnoreFile = await readFile(ignoreFile, {
				encoding: 'utf8',
			});
			console.log('gitIgnoreFile', gitIgnoreFile);
			return splitAndStripHashComments(gitIgnoreFile);
		},
	);

	console.log('ignoreFileLines', ignoreFileLines);

	return ignoreFileLines.flat();
};
