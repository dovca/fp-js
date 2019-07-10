const {l} = require('../constructs');
const assert = require('assert');
const randomer = require('../util/randomer');

describe('l - Less than', function() {
	it('Should work with one argument', function() {
		const testCases = [
			{output: () => l(randomer.integer(-100, 0)), expected: true},
			{output: () => l(0), expected: false},
			{output: () => l(randomer.integer(1, 100)), expected: false},
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
			{output: () => l(randomer.integer(-100, 0), randomer.integer(0, 100)), expected: true},
			{output: () => l(randomer.integer(0, 100), randomer.integer(-100, 0)), expected: false},
			{output: () => l(0, 0), expected: false},
			{output: () => l(-1, -1), expected: false},
			{output: () => l(1, 1), expected: false},
		];

		for (let i = 0, length = testCases.length; i < length; i++) {
			const tc = testCases[i];
			const output = tc.output();
			const expected = tc.expected;

			assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
		}
	});
});