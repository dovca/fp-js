module.exports = (functionsModuleName) => () => {
	const {n} = require(`${__dirname}/../../lib/${functionsModuleName}`);
	const assert = require('assert');

	describe(`${functionsModuleName}/n - Logical negation`, function () {
		it('Should work', function () {
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
	});
};
