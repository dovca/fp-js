module.exports = (functionsModuleName) => () => {
	const {j} = require(`${__dirname}/../../dist/${functionsModuleName}`);
	const assert = require('assert');
	const randomer = require(`${__dirname}/../../util/randomer`);

	describe(`${functionsModuleName}/j - Object`, function () {
		it('Should work without arguments', function () {
			const testCases = [
				{output: () => j(), expected: {}},
			];

			for (let i = 0, length = testCases.length; i < length; i++) {
				const tc = testCases[i];
				const output = tc.output();
				const expected = tc.expected;

				assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
			}
		});

		it('Should work with one argument', function () {
			const random = randomer.anything();
			const testCases = [
				{output: () => j([0, 1]), expected: {0: 1}},
				{output: () => j(['abc', 'def']), expected: {abc: 'def'}},
				{output: () => j(['x', {a: 1}]), expected: {x: {a: 1}}},
				{output: () => j([random, random]), expected: {[random]: random}},
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
				{output: () => j([0, 1], [2, 3], [4, 5]), expected: {0: 1, 2: 3, 4: 5}},
				{output: () => j(['abc', 1], ['def', null]), expected: {abc: 1, def: null}},
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
