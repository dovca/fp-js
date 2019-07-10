const {a} = require('../constructs');
const assert = require('assert');

describe('a - Logical AND', function() {
	it('Should work with one argument', function() {
		const testCases = [
			{output: () => a(true), expected: true},
			{output: () => a(false), expected: false},
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
			{output: () => a(false, false), expected: false},
			{output: () => a(true, false), expected: false},
			{output: () => a(false, true), expected: false},
			{output: () => a(true, true), expected: true},
		];

		for (let i = 0, length = testCases.length; i < length; i++) {
			const tc = testCases[i];
			const output = tc.output();
			const expected = tc.expected;

			assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
		}
	});
});