import { readFile } from 'node:fs/promises';
import { DISTRIBUTION_MARK } from './distribute-file-in-workspace.function.js';

export const isDistributedFile = async (path: string): Promise<boolean> => {
	const content = await readFile(path, { encoding: 'utf8' });
	return content?.includes(DISTRIBUTION_MARK) ?? false;
};
