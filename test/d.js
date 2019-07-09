const {d, a, o} = require('../constructs');
const assert = require('assert');
const randomer = require('../util/randomer');
const sinon = require('sinon');

describe('d', function() {
	const sum = (a, b) => a + b;

	it('Should work with function and two arguments', function() {

		const testCases = [
			{output: () => d(a, true, true), expected: true},
			{output: () => d(a, false, true), expected: false},
			{output: () => d(a, true, false), expected: false},
			{output: () => d(a, false, false), expected: false},
			{output: () => d(o, true, true), expected: true},
			{output: () => d(o, false, true), expected: true},
			{output: () => d(o, true, false), expected: true},
			{output: () => d(o, false, false), expected: false},
			{output: () => d(sum, 1, 2), expected: 3},
			{output: () => d(sum, 50, 100), expected: 150},
			{output: () => d(sum, 0, 0), expected: 0},
		];

		for (let i = 0, length = testCases.length; i < length; i++) {
			const tc = testCases[i];
			const output = tc.output();
			const expected = tc.expected;

			assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
		}
	});

	it('Should work with function and many arguments', function() {
		const testCases = [
			{output: () => d(a, true, true, true, true), expected: true},
			{output: () => d(a, true, true, true, false), expected: false},
			{output: () => d(a, true, true, false, true), expected: false},
			{output: () => d(a, true, true, false, false), expected: false},
			{output: () => d(a, true, false, true, true), expected: false},
			{output: () => d(a, true, false, true, false), expected: false},
			{output: () => d(a, true, false, false, true), expected: false},
			{output: () => d(a, true, false, false, false), expected: false},
			{output: () => d(a, false, true, true, true), expected: false},
			{output: () => d(a, false, true, true, false), expected: false},
			{output: () => d(a, false, true, false, true), expected: false},
			{output: () => d(a, false, true, false, false), expected: false},
			{output: () => d(a, false, false, true, true), expected: false},
			{output: () => d(a, false, false, true, false), expected: false},
			{output: () => d(a, false, false, false, true), expected: false},
			{output: () => d(a, false, false, false, false), expected: false},
			{output: () => d(a, false, ...randomer.array(randomer.boolean, 20)), expected: false},

			{output: () => d(o, true, true, true, true), expected: true},
			{output: () => d(o, true, true, true, false), expected: true},
			{output: () => d(o, true, true, false, true), expected: true},
			{output: () => d(o, true, true, false, false), expected: true},
			{output: () => d(o, true, false, true, true), expected: true},
			{output: () => d(o, true, false, true, false), expected: true},
			{output: () => d(o, true, false, false, true), expected: true},
			{output: () => d(o, true, false, false, false), expected: true},
			{output: () => d(o, false, true, true, true), expected: true},
			{output: () => d(o, false, true, true, false), expected: true},
			{output: () => d(o, false, true, false, true), expected: true},
			{output: () => d(o, false, true, false, false), expected: true},
			{output: () => d(o, false, false, true, true), expected: true},
			{output: () => d(o, false, false, true, false), expected: true},
			{output: () => d(o, false, false, false, true), expected: true},
			{output: () => d(o, false, false, false, false), expected: false},
			{output: () => d(a, false, ...randomer.array(randomer.boolean, 20)), expected: false},

			{output: () => d(sum, 1, 2, 3, 4, 5), expected: 15},
			{output: () => d(sum, 1, 1, 1, 1, 1, 1), expected: 6},
			{output: () => d(sum, 1, -1, 1, -1, 1, -1), expected: 0},
			{output: () => d(sum, -1, -1, -1, -1, -1, -1), expected: -6},
			{output: () => d(sum, -1, 1, -1, 1, -1, 1), expected: 0},
			{output: () => d(sum, 0, 0, 0, 0, 1), expected: 1},
			{output: () => d(sum, 0, 0, 0, 1, 0), expected: 1},
			{output: () => d(sum, 0, 0, 1, 0, 0), expected: 1},
			{output: () => d(sum, 0, 1, 0, 0, 0), expected: 1},
			{output: () => d(sum, 1, 0, 0, 0, 0), expected: 1},
			{output: () => d(sum, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1), expected: 15},
		];

		for (let i = 0, length = testCases.length; i < length; i++) {
			const tc = testCases[i];
			const output = tc.output();
			const expected = tc.expected;

			assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
		}
	});
});