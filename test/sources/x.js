module.exports = (functionsModuleName) => () => {
	const {x} = require(`${__dirname}/../../lib/${functionsModuleName}`);
	const assert = require('assert');

	describe(`${functionsModuleName}/x - Extract`, function () {
		it('Should work with arrays', function () {
			const testCases = [
				{output: () => x(0, []), expected: undefined},
				{output: () => x(0, [1]), expected: 1},
				{output: () => x(0, [2, 3]), expected: 2},

				{output: () => x(1, []), expected: undefined},
				{output: () => x(1, [1]), expected: undefined},
				{output: () => x(1, [2, 3]), expected: 3},
			];

			for (let i = 0, length = testCases.length; i < length; i++) {
				const tc = testCases[i];
				const output = tc.output();
				const expected = tc.expected;

				assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
			}
		});

		it('Should work with objects', function () {
			const testCases = [
				{output: () => x(0, {}), expected: undefined},
				{output: () => x(0, {0: 1}), expected: 1},
				{output: () => x(0, {0: 2, 1: 3}), expected: 2},

				{output: () => x(1, {}), expected: undefined},
				{output: () => x(1, {0: 1}), expected: undefined},
				{output: () => x(1, {0: 2, 1: 3}), expected: 3},

				{output: () => x('abc', {}), expected: undefined},
				{output: () => x('abc', {abc: 1}), expected: 1},
				{output: () => x('abc', {abc: 2, def: 3}), expected: 2},
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
				{output: () => x(0, ''), expected: undefined},
				{output: () => x(0, 'a'), expected: 'a'},
				{output: () => x(0, 'abc'), expected: 'a'},

				{output: () => x(1, ''), expected: undefined},
				{output: () => x(1, 'a'), expected: undefined},
				{output: () => x(1, 'abc'), expected: 'b'},
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
