module.exports = (functionsModuleName) => () => {
	const {u} = require(`${__dirname}/../../dist/${functionsModuleName}`);
	const assert = require('assert');

	describe(`${functionsModuleName}/u - Reduce`, function () {
		const sum = (a, b) => a + b;
		const or = (a, b) => a || b;

		it('Should work with function and two arguments', function () {

			const testCases = [
				{output: () => u(or, true, true), expected: true},
				{output: () => u(or, false, true), expected: true},
				{output: () => u(or, true, false), expected: true},
				{output: () => u(or, false, false), expected: false},
				{output: () => u(sum, 1, 2), expected: 3},
				{output: () => u(sum, 50, 100), expected: 150},
				{output: () => u(sum, 0, 0), expected: 0},
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
				{output: () => u(or, true, true, true, true), expected: true},
				{output: () => u(or, true, true, true, false), expected: true},
				{output: () => u(or, true, true, false, true), expected: true},
				{output: () => u(or, true, true, false, false), expected: true},
				{output: () => u(or, true, false, true, true), expected: true},
				{output: () => u(or, true, false, true, false), expected: true},
				{output: () => u(or, true, false, false, true), expected: true},
				{output: () => u(or, true, false, false, false), expected: true},
				{output: () => u(or, false, true, true, true), expected: true},
				{output: () => u(or, false, true, true, false), expected: true},
				{output: () => u(or, false, true, false, true), expected: true},
				{output: () => u(or, false, true, false, false), expected: true},
				{output: () => u(or, false, false, true, true), expected: true},
				{output: () => u(or, false, false, true, false), expected: true},
				{output: () => u(or, false, false, false, true), expected: true},
				{output: () => u(or, false, false, false, false), expected: false},

				{output: () => u(sum, 1, 2, 3, 4, 5), expected: 15},
				{output: () => u(sum, 1, 1, 1, 1, 1, 1), expected: 6},
				{output: () => u(sum, 1, -1, 1, -1, 1, -1), expected: 0},
				{output: () => u(sum, -1, -1, -1, -1, -1, -1), expected: -6},
				{output: () => u(sum, -1, 1, -1, 1, -1, 1), expected: 0},
				{output: () => u(sum, 0, 0, 0, 0, 1), expected: 1},
				{output: () => u(sum, 0, 0, 0, 1, 0), expected: 1},
				{output: () => u(sum, 0, 0, 1, 0, 0), expected: 1},
				{output: () => u(sum, 0, 1, 0, 0, 0), expected: 1},
				{output: () => u(sum, 1, 0, 0, 0, 0), expected: 1},
				{output: () => u(sum, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1), expected: 15},
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
