module.exports = (functionsModuleName) => () => {
	const {q} = require(`${__dirname}/../../dist/${functionsModuleName}`);
	const assert = require('assert');

	describe(`${functionsModuleName}/q - Dequeue`, function () {
		it('Should discard first element in collection', function () {
			const testCases = [
				{output: () => q([]), expected: []},
				{output: () => q([1]), expected: []},
				{output: () => q([2, 3]), expected: [3]},
				{output: () => q([4, 5, 6, 7]), expected: [5, 6, 7]},
				{output: () => q([0, [1, 2], [3, 4, 5]]), expected: [[1, 2], [3, 4, 5]]},
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
