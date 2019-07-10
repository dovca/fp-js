const {p} = require('../constructs');
const assert = require('assert');
const randomer = require('../util/randomer');

describe('p - Pipe', function() {
	const double = (x) => 2 * x;
	const add = (x) => x + 1;
	const minus = (x) => -x;

	it('Should work with one function', function() {
		const testCases = [
			{output: () => p(double)(10), expected: 20},
			{output: () => p(add)(10), expected: 11},
			{output: () => p(minus)(10), expected: -10},
		];

		for (let i = 0, length = testCases.length; i < length; i++) {
			const tc = testCases[i];
			const output = tc.output();
			const expected = tc.expected;

			assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
		}
	});

	it('Should work with many functions', function() {
		const testCases = [
			{output: () => p(double, add, minus)(10), expected: -21},
			{output: () => p(add, minus, double)(10), expected: -22},
			{output: () => p(minus, double, add)(10), expected: -19},
		];

		for (let i = 0, length = testCases.length; i < length; i++) {
			const tc = testCases[i];
			const output = tc.output();
			const expected = tc.expected;

			assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
		}
	});
});