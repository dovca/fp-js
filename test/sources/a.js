module.exports = (functionsModuleName) => () => {
	const {a} = require(`${__dirname}/../../lib/${functionsModuleName}`);
	const assert = require('assert');

	describe(`${functionsModuleName}/a - Add`, function () {
		it('Should work without arguments', function () {
			const testCases = [
				{output: () => a(), expected: 1},
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
				{output: () => a(0), expected: 1},
				{output: () => a(1), expected: 2},
				{output: () => a(100), expected: 101},
				{output: () => a(-1), expected: 0},
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
				{output: () => a(0, 0), expected: 0},
				{output: () => a(0, 1), expected: 1},
				{output: () => a(1, 0), expected: 1},
				{output: () => a(100, 200), expected: 300},
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
