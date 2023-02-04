import { describe, expect, it } from 'vitest';
import { fillObjectWithTemplateVariables } from './fill-object-with-template-variables.function.js';

describe('fillObjectWithTemplateVariables', () => {
	it('should fill in declared variables in an object', () => {
		const variableMap = {
			foo: 'fooValue',
			bar: 'barValue',
		};
		const source = {
			a: 'foo: ${foo}',
			deep: {
				a: 'bar: ${bar}',
				b: 'fooBar: ${foo} ${bar}',
			},
		};

		const expected = {
			a: 'foo: fooValue',
			deep: {
				a: 'bar: barValue',
				b: 'fooBar: fooValue barValue',
			},
		};
		const filled = fillObjectWithTemplateVariables(source, variableMap);

		expect(filled).not.toBe(source);
		expect(filled).toEqual(expected);
	});
});
