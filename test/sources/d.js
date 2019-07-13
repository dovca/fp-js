module.exports = (functionsModuleName) => () => {
	const {d} = require(`${__dirname}/../../lib/${functionsModuleName}`);
	const assert = require('assert');

	describe(`${functionsModuleName}/d - Double`, function () {
		it('Should work without arguments', function () {
			const testCases = [
				{output: () => d(), expected: 2},
			];

			for (let i = 0, length = testCases.length; i < length; i++) {
				const tc = testCases[i];
				const output = tc.output();
				const expected = tc.expected;

				assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
			}
		});

		it('Should work with one argument', function () {
			const testCases = [
				{output: () => d(0), expected: 0},
				{output: () => d(1), expected: 2},
				{output: () => d(100), expected: 200},
				{output: () => d(-1), expected: -2},
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
