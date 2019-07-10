/*const {u} = require('../constructs');
const assert = require('assert');

describe('u - Undefined', function() {
	it('Should work', function() {
		const testCases = [
			{output: () => u(undefined), expected: true},
			{output: () => u(null), expected: false},
			{output: () => u(false), expected: false},
			{output: () => u(''), expected: false},
			{output: () => u('abc'), expected: false},
			{output: () => u([]), expected: false},
			{output: () => u([1, 2, 3]), expected: false},
			{output: () => u({}), expected: false},
			{output: () => u({a: 1}), expected: false},
			{output: () => u(30), expected: false},
			{output: () => u(0), expected: false},
			{output: () => u(({a: 1}).b), expected: true},
			{output: () => u(([1, 2, 3])[10]), expected: true},
		];

		for (let i = 0, length = testCases.length; i < length; i++) {
			const tc = testCases[i];
			const output = tc.output();
			const expected = tc.expected;

			assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
		}
	});
});*/
