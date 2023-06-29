export type Predicate<T> = (value?: T) => boolean;

export const not = <T>(predicate: Predicate<T>): Predicate<T> => {
	return (value?: T): boolean => !predicate(value);
};

export const equal = <T>(criteria: T) => {
	return (value?: T): value is T => value === criteria;
};

export const and = <T>(...predicates: Predicate<T>[]): Predicate<T> => {
	return (value?: T): boolean => predicates.every((predicate) => predicate(value));
};

export const or = <T>(...predicates: Predicate<T>[]): Predicate<T> => {
	return (value?: T): boolean => predicates.some((predicate) => predicate(value));
};

export const contains = <T extends string>(criteria: T): Predicate<string> => {
	return (value?: T | string): value is string => value?.includes(criteria) ?? false;
};

export const matchRegExp = <T extends string>(criteria: RegExp): Predicate<string> => {
	return (value?: T | string): value is string =>
		typeof value === 'string' ? criteria.test(value) : false;
};

export const predicate = {
	not,
	equal,
	and,
	or,
	contains,
	matchRegExp,
} as const;
