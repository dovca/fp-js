const {r} = require('../constructs');
const assert = require('assert');
const randomer = require('../util/randomer');
const sinon = require('sinon');

describe('r - Curry', function() {
	const sum = (a, b) => a + b;

	it('Should work for depth 2', function() {
		const curried = r(sum, 2);
		const testCases = [
			{output: () => curried(0)(0), expected: 0},
			{output: () => curried(0)(1), expected: 1},
			{output: () => curried(1)(2), expected: 3},
			{output: () => curried(1000)(500), expected: 1500},
			{output: () => curried(-100)(500), expected: 400},
		];

		for (let i = 0, length = testCases.length; i < length; i++) {
			const tc = testCases[i];
			const output = tc.output();
			const expected = tc.expected;

			assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
		}
	});

	it('Should work for any depth', function() {
		const curried3 = r(sum, 3);
		const curried5 = r(sum, 5);
		const curried10 = r(sum, 10);
		const testCases = [
			{output: () => curried3(1)(10)(100), expected: 111},
			{output: () => curried5(1)(2)(3)(4)(5), expected: 15},
			{output: () => curried10(1)(1)(1)(1)(1)(1)(1)(1)(1)(1), expected: 10},
		];

		for (let i = 0, length = testCases.length; i < length; i++) {
			const tc = testCases[i];
			const output = tc.output();
			const expected = tc.expected;

			assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
		}
	});
});