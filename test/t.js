const {t} = require('../functions');
const assert = require('assert');
const randomer = require('../util/randomer');

describe('t - Concat', function() {
	it('Should push other arguments into first argument', function() {
		const randomArray = randomer.array(randomer.anything);
		const randomElement = randomer.anything();
		const testCases = [
			{output: () => t([]), expected: []},
			{output: () => t([1]), expected: [1]},
			{output: () => t([1], randomElement), expected: [1, randomElement]},
			{output: () => t([2, 3], 4, 5, 6), expected: [2, 3, 4, 5, 6]},
			{output: () => t([4, 5, 6, 7], 8, 9), expected: [4, 5, 6, 7, 8, 9]},
			{output: () => t([0], [1, 2], [3, 4, 5]), expected: [0, [1, 2], [3, 4, 5]]},
			{output: () => t(randomArray, randomElement), expected: [...randomArray, randomElement]},
		];

		for (let i = 0, length = testCases.length; i < length; i++) {
			const tc = testCases[i];
			const output = tc.output();
			const expected = tc.expected;

			assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
		}
	});
});