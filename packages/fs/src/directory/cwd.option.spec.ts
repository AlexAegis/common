import { afterEach, beforeAll, describe, expect, it, SpyInstance, vi } from 'vitest';
import { normalizeCwdOption, NormalizedCwdOption } from './cwd.option.js';

export const mockCwd = '/cwd';

export const mockCwdOption = (): SpyInstance => {
	return vi.spyOn(process, 'cwd').mockReturnValue(mockCwd);
};

describe('cwdOption', () => {
	let processCwdSpy: SpyInstance;

	beforeAll(() => {
		processCwdSpy = mockCwdOption();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('should default to process.cwd() when not defined', () => {
		expect(normalizeCwdOption()).toEqual({
			cwd: mockCwd,
		} as NormalizedCwdOption);

		expect(processCwdSpy).toHaveBeenCalled();
	});

	it('should not call process.cwd() when cwd is overridden', () => {
		const cwdOverride = './foo';
		expect(normalizeCwdOption({ cwd: cwdOverride })).toEqual({
			cwd: cwdOverride,
		} as NormalizedCwdOption);

		expect(processCwdSpy).not.toHaveBeenCalled();
	});
});
