module.exports = (functionsModuleName) => () => {
	const {f} = require(`${__dirname}/../../lib/${functionsModuleName}`);
	const assert = require('assert');

	describe(`${functionsModuleName}/f - Filter`, function () {
		const isEven = (x) => x % 2 === 0;
		const isPositive = (x) => x > 0;

		it('Should work with function and no other arguments', function () {
			const testCases = [
				{output: () => f(isEven), expected: []},
			];

			for (let i = 0, length = testCases.length; i < length; i++) {
				const tc = testCases[i];
				const output = tc.output();
				const expected = tc.expected;

				assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
			}
		});

		it('Should work with function and one argument', function () {
			const testCases = [
				{output: () => f(isEven, 0), expected: [0]},
				{output: () => f(isEven, 2), expected: [2]},
				{output: () => f(isEven, 5), expected: []},
				{output: () => f(isPositive, 10), expected: [10]},
				{output: () => f(isPositive, -5), expected: []},
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
				{output: () => f(isEven, 0, 1, 2, 3, 4, 5), expected: [0, 2, 4]},
				{output: () => f(isEven, 1, 2,), expected: [2]},
				{output: () => f(isEven, 1, 1, 1, 1), expected: []},
				{output: () => f(isEven, 3, 7, 4, 8, 3, 5, 8, 0, 2, 7, 9, 8), expected: [4, 8, 8, 0, 2, 8]},
				{output: () => f(isEven, 10, 11, 12, 13, 14), expected: [10, 12, 14]},
				{output: () => f(isPositive, 3, 0, -10, 6, 23, -5, 9, -8), expected: [3, 6, 23, 9]},
				{output: () => f(isPositive, 5, 5), expected: [5, 5]},
				{output: () => f(isPositive, 0, 0, 0, 1, 0, 0, 0, 2, 0, -5, -10), expected: [1, 2]},
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
