module.exports = (functionsModuleName) => () => {
	const {x} = require(`${__dirname}/../../dist/${functionsModuleName}`);
	const assert = require('assert');

	describe(`${functionsModuleName}/x - Extract`, function () {
		it('Should work with arrays', function () {
			const testCases = [
				{output: () => x([]), expected: undefined},
				{output: () => x([0]), expected: 0},
				{output: () => x([1, 2, 3]), expected: 1},
				{output: () => x(['abc', 'def']), expected: 'abc'},
			];

			for (let i = 0, length = testCases.length; i < length; i++) {
				const tc = testCases[i];
				const output = tc.output();
				const expected = tc.expected;

				assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
			}
		});

		it('Should work with strings', function () {
			const testCases = [
				{output: () => x(''), expected: undefined},
				{output: () => x('a'), expected: 'a'},
				{output: () => x('abc'), expected: 'a'},
				{output: () => x('ghijklmnopqrstuv'), expected: 'g'},
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
