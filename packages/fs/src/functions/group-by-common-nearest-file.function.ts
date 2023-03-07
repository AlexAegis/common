import { findNearestFile } from './find-nearest-file.function.js';

/**
 *
 */
export const groupByCommonNearestFile = (
	paths: string[],
	filename: string
): Record<string, string[]> => {
	return paths.reduce((groups, path) => {
		const nearestFile = findNearestFile(filename, path);

		if (nearestFile) {
			if (!groups[nearestFile]) {
				groups[nearestFile] = [];
			}

			groups[nearestFile].push(path);
		}

		return groups;
	}, {} as Record<string, string[]>);
};
