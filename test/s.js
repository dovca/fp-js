const {s} = require('../functions');
const assert = require('assert');

describe('s - Subtract', function() {
	it('Should work without arguments', function() {
		const testCases = [
			{output: () => s(), expected: -1},
		];

		for (let i = 0, length = testCases.length; i < length; i++) {
			const tc = testCases[i];
			const output = tc.output();
			const expected = tc.expected;

			assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
		}
	});

	it('Should work with one argument', function() {
		const testCases = [
			{output: () => s(-2), expected: 2},
			{output: () => s(-1), expected: 1},
			{output: () => s(0), expected: 0},
			{output: () => s(1), expected: -1},
			{output: () => s(2), expected: -2},

			{output: () => s(false), expected: 0},
			{output: () => s(true), expected: -1},
		];

		for (let i = 0, length = testCases.length; i < length; i++) {
			const tc = testCases[i];
			const output = tc.output();
			const expected = tc.expected;

			assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
		}
	});

	it('Should work with two arguments', function() {
		const testCases = [
			{output: () => s(-2, -2), expected: 0},
			{output: () => s(-2, -1), expected: 1},
			{output: () => s(-2, 0), expected: 2},
			{output: () => s(-2, 1), expected: 3},
			{output: () => s(-2, 2), expected: 4},

			{output: () => s(-1, -2), expected: -1},
			{output: () => s(-1, -1), expected: 0},
			{output: () => s(-1, 0), expected: 1},
			{output: () => s(-1, 1), expected: 2},
			{output: () => s(-1, 2), expected: 3},

			{output: () => s(0, -2), expected: -2},
			{output: () => s(0, -1), expected: -1},
			{output: () => s(0, 0), expected: 0},
			{output: () => s(0, 1), expected: 1},
			{output: () => s(0, 2), expected: 2},

			{output: () => s(1, -2), expected: -3},
			{output: () => s(1, -1), expected: -2},
			{output: () => s(1, 0), expected: -1},
			{output: () => s(1, 1), expected: 0},
			{output: () => s(1, 2), expected: 1},

			{output: () => s(2, -2), expected: -4},
			{output: () => s(2, -1), expected: -3},
			{output: () => s(2, 0), expected: -2},
			{output: () => s(2, 1), expected: -1},
			{output: () => s(2, 2), expected: 0},

			{output: () => s(false, false), expected: 0},
			{output: () => s(false, true), expected: 1},
			{output: () => s(true, false), expected: -1},
			{output: () => s(true, true), expected: 0},
		];

		for (let i = 0, length = testCases.length; i < length; i++) {
			const tc = testCases[i];
			const output = tc.output();
			const expected = tc.expected;

			assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
		}
	});
});