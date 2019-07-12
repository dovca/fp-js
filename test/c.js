const {c} = require('../functions');
const assert = require('assert');
const randomer = require('../util/randomer');

describe('c - Count', function() {
	it('Should work with arrays', function() {
		const testCases = [
			{output: () => c([]), expected: 0},
			{output: () => c([1]), expected: 1},
			{output: () => c([2, 3]), expected: 2},
			{output: () => c(randomer.array(randomer.anything, 5)), expected: 5},
		];

		for (let i = 0, length = testCases.length; i < length; i++) {
			const tc = testCases[i];
			const output = tc.output();
			const expected = tc.expected;

			assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
		}
	});

	it('Should work with strings', function() {
		const testCases = [
			{output: () => c(''), expected: 0},
			{output: () => c('a'), expected: 1},
			{output: () => c('abc'), expected: 3},
		];

		for (let i = 0, length = testCases.length; i < length; i++) {
			const tc = testCases[i];
			const output = tc.output();
			const expected = tc.expected;

			assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
		}
	});
});