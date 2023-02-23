import type { Awaitable } from '../index.js';

export const sleep = (ms: number): Awaitable<void> => {
	if (ms > 0) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
};
