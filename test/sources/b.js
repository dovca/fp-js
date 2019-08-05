module.exports = (functionsModuleName) => () => {
	const {b} = require(`${__dirname}/../../lib/${functionsModuleName}`);
	const assert = require('assert');
	const randomer = require(`${__dirname}/../../util/randomer`);

	describe(`${functionsModuleName}/b - Subtract`, function () {
		it('Should work without arguments', function () {
			const testCases = [
				{output: () => b(), expected: -1},
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
				{output: () => b(0), expected: -1},
				{output: () => b(-1), expected: -2},
				{output: () => b(1), expected: 0},
				{output: () => b(10), expected: 9},
				{output: () => b(-11), expected: -12},
			];

			for (let i = 0, length = testCases.length; i < length; i++) {
				const tc = testCases[i];
				const output = tc.output();
				const expected = tc.expected;

				assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
			}
		});

		it('Should work with two arguments', function () {
			const testCases = [
				{output: () => b(0, 0), expected: 0},
				{output: () => b(-1, -1), expected: 0},
				{output: () => b(1, 1), expected: 0},
				{output: () => b(0, 1), expected: -1},
				{output: () => b(1, 0), expected: 1},
				{output: () => b(5, 4), expected: 1},
				{output: () => b(10, 5), expected: 5},
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
