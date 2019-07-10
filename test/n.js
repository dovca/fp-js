const {n} = require('../constructs');
const assert = require('assert');

describe('n - Logical NOR', function() {
	it('Should work with one argument', function() {
		const testCases = [
			{output: () => n(true), expected: false},
			{output: () => n(false), expected: true},
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
			{output: () => n(false, false), expected: true},
			{output: () => n(true, false), expected: false},
			{output: () => n(false, true), expected: false},
			{output: () => n(true, true), expected: false},
		];

		for (let i = 0, length = testCases.length; i < length; i++) {
			const tc = testCases[i];
			const output = tc.output();
			const expected = tc.expected;

			assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
		}
	});
});