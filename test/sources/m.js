module.exports = (functionsModuleName) => () => {
	const {m} = require(`${__dirname}/../../lib/${functionsModuleName}`);
	const assert = require('assert');

	describe(`${functionsModuleName}/m - Member`, function () {
		it('Should work with arrays', function () {
			const testCases = [
				{output: () => m(0, []), expected: undefined},
				{output: () => m(0, [1]), expected: 1},
				{output: () => m(0, [2, 3]), expected: 2},

				{output: () => m(1, []), expected: undefined},
				{output: () => m(1, [1]), expected: undefined},
				{output: () => m(1, [2, 3]), expected: 3},
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
				{output: () => m(0, {}), expected: undefined},
				{output: () => m(0, {0: 1}), expected: 1},
				{output: () => m(0, {0: 2, 1: 3}), expected: 2},

				{output: () => m(1, {}), expected: undefined},
				{output: () => m(1, {0: 1}), expected: undefined},
				{output: () => m(1, {0: 2, 1: 3}), expected: 3},

				{output: () => m('abc', {}), expected: undefined},
				{output: () => m('abc', {abc: 1}), expected: 1},
				{output: () => m('abc', {abc: 2, def: 3}), expected: 2},
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
				{output: () => m(0, ''), expected: undefined},
				{output: () => m(0, 'a'), expected: 'a'},
				{output: () => m(0, 'abc'), expected: 'a'},

				{output: () => m(1, ''), expected: undefined},
				{output: () => m(1, 'a'), expected: undefined},
				{output: () => m(1, 'abc'), expected: 'b'},
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
