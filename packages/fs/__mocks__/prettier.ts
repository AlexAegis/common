import { vi } from 'vitest';
import { mockPrettier } from '../src/mocks.js';

export const prettierMock = mockPrettier(vi);

export default prettierMock.prettier;
