import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [],
	test: {
		globals: true,
		environment: 'node',
		coverage: {
			provider: 'c8',
			all: true,
			'100': true,
			reporter: ['text', 'json', 'html', 'lcov'],
			reportsDirectory: './coverage',
		},
	},
});
