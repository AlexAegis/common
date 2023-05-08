import { readFile } from 'node:fs/promises';
import { DISTRIBUTION_MARK } from './distribute-file-in-workspace.function.js';

/**
 *  @deprecated use autotool
 */
export const isDistributedFile = async (path: string): Promise<boolean> => {
	try {
		const content = await readFile(path, { encoding: 'utf8' });
		return content.includes(DISTRIBUTION_MARK);
	} catch {
		return false;
	}
};
