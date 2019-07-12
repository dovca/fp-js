module.exports = (functionsModuleName) => () => {
	const {g} = require(`${__dirname}/../../dist/${functionsModuleName}`);
	const assert = require('assert');

	describe(`${functionsModuleName}/g - Compose`, function () {
		const double = (x) => 2 * x;
		const add = (x) => x + 1;
		const minus = (x) => -x;

		it('Should work with one function', function () {
			const testCases = [
				{output: () => g(double)(10), expected: 20},
				{output: () => g(add)(10), expected: 11},
				{output: () => g(minus)(10), expected: -10},
			];

			for (let i = 0, length = testCases.length; i < length; i++) {
				const tc = testCases[i];
				const output = tc.output();
				const expected = tc.expected;

				assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
			}
		});

		it('Should work with many functions', function () {
			const testCases = [
				{output: () => g(double, add, minus)(10), expected: -18},
				{output: () => g(add, minus, double)(10), expected: -19},
				{output: () => g(minus, double, add)(10), expected: -22},
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
