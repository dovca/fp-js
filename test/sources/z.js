module.exports = (functionsModuleName) => () => {
	const {z} = require(`${__dirname}/../../dist/${functionsModuleName}`);
	const assert = require('assert');

	describe(`${functionsModuleName}/z - Zero`, function () {
		it('Should output 0', function () {
			const testCases = [
				{output: () => z(), expected: 0},
			];

			for (let i = 0, length = testCases.length; i < length; i++) {
				const tc = testCases[i];
				const output = tc.output();
				const expected = tc.expected;

				assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
			}
		})
	});
};