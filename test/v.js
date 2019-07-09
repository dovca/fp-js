const {v} = require('../constructs');
const assert = require('assert');

describe('v', function() {
	it('Should work with one argument', function() {
		const testCases = [
			{output: () => v(null), expected: [null]},
			{output: () => v(0), expected: [0]},
			{output: () => v(1), expected: [1]},
			{output: () => v('a'), expected: ['a']},
			{output: () => v({a: 1}), expected: [{a: 1}]},
			{output: () => v([1, 2, 3]), expected: [[1, 2, 3]]},
		];

		for (let i = 0, length = testCases.length; i < length; i++) {
			const tc = testCases[i];
			const output = tc.output();
			const expected = tc.expected;

			assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
		}
	});

	it('Should work with many arguments', function() {
		const testCases = [
			{output: () => v(null, false, '', 0, []), expected: [[], 0, '', false, null]},
			{output: () => v(0, 1, 2, 3, 4), expected: [4, 3, 2, 1, 0]},
			{output: () => v([1, 2], [3, 4], [5, 6]), expected: [[5, 6], [3, 4], [1, 2]]},
			{output: () => v({a: 1}, {b: 2}, {c: [3, 4, 5]}), expected: [{c: [3, 4, 5]}, {b: 2}, {a: 1}]},
		];

		for (let i = 0, length = testCases.length; i < length; i++) {
			const tc = testCases[i];
			const output = tc.output();
			const expected = tc.expected;

			assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
		}
	});
});