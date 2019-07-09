const {t} = require('../constructs');
const assert = require('assert');

describe('t', function() {
	it('Should output true', function() {
		const testCases = [
			{output: () => t(), expected: true},
		];

		for (let i = 0, length = testCases.length; i < length; i++) {
			const tc = testCases[i];
			const output = tc.output();
			const expected = tc.expected;

			assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
		}
	})
});