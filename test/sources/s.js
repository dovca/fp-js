module.exports = (functionsModuleName) => () => {
	const {s} = require(`${__dirname}/../../lib/${functionsModuleName}`);
	const assert = require('assert');

	describe(`${functionsModuleName}/s - String`, function () {
		it('Should work without arguments', function () {
			const testCases = [
				{output: () => s(), expected: ''},
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
				{output: () => s(-2), expected: '-2'},
				{output: () => s(0), expected: '0'},
				{output: () => s(false), expected: 'false'},
				{output: () => s(true), expected: 'true'},
				{output: () => s('abc'), expected: 'abc'},
			];

			for (let i = 0, length = testCases.length; i < length; i++) {
				const tc = testCases[i];
				const output = tc.output();
				const expected = tc.expected;

				assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
			}
		});

		it('Should work with many arguments', function () {
			const testCases = [
				{output: () => s(1, 2), expected: '12'},
				{output: () => s(1, 2, false), expected: '12false'},
				{output: () => s(0, true), expected: '0true'},
				{output: () => s(null, false), expected: 'nullfalse'},
				{output: () => s(1, 2, 3, 4, 5), expected: '12345'},
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
