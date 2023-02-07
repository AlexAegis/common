import type { ObjectKeyOrder } from '@alexaegis/common';

/**
 * The types field in the exports object has to be the first one. This
 * sortingPreference normalizer ensures that.
 *
 * @returns a sortingPreference that will always be suited for packageJson files
 */
export const normalizeSortingPreferenceForPackageJson = (
	sortingPreferences: ObjectKeyOrder
): ObjectKeyOrder => {
	return sortingPreferences.some(
		(sortingPrefrence) =>
			(typeof sortingPrefrence === 'string' && sortingPrefrence === 'exports') ||
			(typeof sortingPrefrence === 'object' && sortingPrefrence.key === 'exports')
	)
		? sortingPreferences.map((sortingPrefrence) => {
				if (typeof sortingPrefrence === 'string' && sortingPrefrence === 'exports') {
					return { key: 'exports', order: [{ key: '.*', order: ['types'] }] };
				} else if (
					typeof sortingPrefrence === 'object' &&
					sortingPrefrence.key === 'exports'
				) {
					const order = sortingPrefrence.order.map((ordering) => {
						if (typeof ordering === 'string') {
							return { key: ordering, order: ['types'] };
						} else {
							const existingTypesEntry = ordering.order.find((o) =>
								typeof o === 'string' ? o === 'types' : o.key === 'types'
							);
							const nonTypesEntries = ordering.order.filter((o) =>
								typeof o === 'string' ? o !== 'types' : o.key !== 'types'
							);
							return {
								key: ordering.key,
								order: [existingTypesEntry ?? 'types', ...nonTypesEntries],
							};
						}
					});

					if (!order.some((o) => o.key === '.*')) {
						order.push({ key: '.*', order: ['types'] });
					}

					return {
						key: 'exports',
						order,
					};
				} else {
					return sortingPrefrence;
				}
		  })
		: [
				...sortingPreferences,
				{
					key: 'exports',
					order: [{ key: '.*', order: ['types'] }],
				},
		  ];
};
