const {u, o} = require('../constructs');
const assert = require('assert');
const randomer = require('../util/randomer');
const sinon = require('sinon');

describe('u - Reduce', function() {
	const sum = (a, b) => a + b;

	it('Should work with function and two arguments', function() {

		const testCases = [
			{output: () => u(o, true, true), expected: true},
			{output: () => u(o, false, true), expected: true},
			{output: () => u(o, true, false), expected: true},
			{output: () => u(o, false, false), expected: false},
			{output: () => u(sum, 1, 2), expected: 3},
			{output: () => u(sum, 50, 100), expected: 150},
			{output: () => u(sum, 0, 0), expected: 0},
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
			{output: () => u(o, true, true, true, true), expected: true},
			{output: () => u(o, true, true, true, false), expected: true},
			{output: () => u(o, true, true, false, true), expected: true},
			{output: () => u(o, true, true, false, false), expected: true},
			{output: () => u(o, true, false, true, true), expected: true},
			{output: () => u(o, true, false, true, false), expected: true},
			{output: () => u(o, true, false, false, true), expected: true},
			{output: () => u(o, true, false, false, false), expected: true},
			{output: () => u(o, false, true, true, true), expected: true},
			{output: () => u(o, false, true, true, false), expected: true},
			{output: () => u(o, false, true, false, true), expected: true},
			{output: () => u(o, false, true, false, false), expected: true},
			{output: () => u(o, false, false, true, true), expected: true},
			{output: () => u(o, false, false, true, false), expected: true},
			{output: () => u(o, false, false, false, true), expected: true},
			{output: () => u(o, false, false, false, false), expected: false},

			{output: () => u(sum, 1, 2, 3, 4, 5), expected: 15},
			{output: () => u(sum, 1, 1, 1, 1, 1, 1), expected: 6},
			{output: () => u(sum, 1, -1, 1, -1, 1, -1), expected: 0},
			{output: () => u(sum, -1, -1, -1, -1, -1, -1), expected: -6},
			{output: () => u(sum, -1, 1, -1, 1, -1, 1), expected: 0},
			{output: () => u(sum, 0, 0, 0, 0, 1), expected: 1},
			{output: () => u(sum, 0, 0, 0, 1, 0), expected: 1},
			{output: () => u(sum, 0, 0, 1, 0, 0), expected: 1},
			{output: () => u(sum, 0, 1, 0, 0, 0), expected: 1},
			{output: () => u(sum, 1, 0, 0, 0, 0), expected: 1},
			{output: () => u(sum, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1), expected: 15},
		];

		for (let i = 0, length = testCases.length; i < length; i++) {
			const tc = testCases[i];
			const output = tc.output();
			const expected = tc.expected;

			assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
		}
	});
});