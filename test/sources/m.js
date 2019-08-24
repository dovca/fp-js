module.exports = (functionsModuleName) => () => {
	const {m} = require(`${__dirname}/../../lib/${functionsModuleName}`);
	const assert = require('assert');

	describe(`${functionsModuleName}/m - Map`, function () {
		const double = (x) => 2 * x;

		it('Should work with function and one argument', function () {
			const testCases = [
				{output: () => m(double, 0), expected: [0]},
				{output: () => m(double, 2), expected: [4]},
				{output: () => m(double, 10), expected: [20]},
			];

			for (let i = 0, length = testCases.length; i < length; i++) {
				const tc = testCases[i];
				const output = tc.output();
				const expected = tc.expected;

				assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
			}
		});

		it('Should work with function and many arguments', function () {
			const testCases = [
				{output: () => m(double, 0, 1, 2, 3, 4, 5), expected: [0, 2, 4, 6, 8, 10]},
				{output: () => m(double, 1, 1, 1, 1), expected: [2, 2, 2, 2]},
				{output: () => m(double, 100, 1000, 10000), expected: [200, 2000, 20000]},
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
