const {b} = require('../constructs');
const assert = require('assert');
const randomer = require('../util/randomer');

describe('b', function() {
	it('Should work with one argument', function() {
		const testCases = [
			{output: () => b(randomer.integer(-100, 0)), expected: false},
			{output: () => b(0), expected: false},
			{output: () => b(randomer.integer(1, 100)), expected: true},
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
			{output: () => b(randomer.integer(-100, 0), randomer.integer(0, 100)), expected: false},
			{output: () => b(randomer.integer(0, 100), randomer.integer(-100, 0)), expected: true},
			{output: () => b(0, 0), expected: false},
			{output: () => b(-1, -1), expected: false},
			{output: () => b(1, 1), expected: false},
		];

		for (let i = 0, length = testCases.length; i < length; i++) {
			const tc = testCases[i];
			const output = tc.output();
			const expected = tc.expected;

			assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
		}
	});
});