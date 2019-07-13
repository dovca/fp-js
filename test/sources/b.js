module.exports = (functionsModuleName) => () => {
	const {b} = require(`${__dirname}/../../lib/${functionsModuleName}`);
	const assert = require('assert');
	const randomer = require(`${__dirname}/../../util/randomer`);

	describe(`${functionsModuleName}/b - Bigger than`, function () {
		it('Should work with one argument', function () {
			const testCases = [
				{output: () => b(randomer.integer(-100, 1)), expected: false},
				{output: () => b(-1), expected: false},
				{output: () => b(0), expected: false},
				{output: () => b(1), expected: true},
				{output: () => b(randomer.integer(1, 100)), expected: true},
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
				{output: () => b(randomer.integer(-100, 0), randomer.integer(0, 100)), expected: false},
				{output: () => b(randomer.integer(0, 100), randomer.integer(-100, 0)), expected: true},
				{output: () => b(0, 0), expected: false},
				{output: () => b(-1, -1), expected: false},
				{output: () => b(1, 1), expected: false},
				{output: () => b(0, 1), expected: false},
				{output: () => b(1, 0), expected: true},
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
