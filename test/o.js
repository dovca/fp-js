const {o} = require('../constructs');
const assert = require('assert');

describe('o - Logical OR', function() {
	it('Should work with one argument', function() {
		const testCases = [
			{output: () => o(true), expected: true},
			{output: () => o(false), expected: false},
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
			{output: () => o(false, false), expected: false},
			{output: () => o(true, false), expected: true},
			{output: () => o(false, true), expected: true},
			{output: () => o(true, true), expected: true},
		];

		for (let i = 0, length = testCases.length; i < length; i++) {
			const tc = testCases[i];
			const output = tc.output();
			const expected = tc.expected;

			assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
		}
	});
});