module.exports = (functionsModuleName) => () => {
	const {z} = require(`${__dirname}/../../lib/${functionsModuleName}`);
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
		});

		it('Should convert to number', function () {
			const testCases = [
				{output: () => z(false), expected: 0},
				{output: () => z(true), expected: 1},
				{output: () => z(null), expected: 0},
				{output: () => z(1), expected: 1},
				{output: () => z(-5), expected: -5},
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
