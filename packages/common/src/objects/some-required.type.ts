/**
 * Mark some variables as required, but not all.
 */
export type SomeRequired<T, K extends keyof T = keyof T> = Required<Pick<T, K>> & Omit<T, K>;
