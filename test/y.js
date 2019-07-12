const {y} = require('../functions');
const assert = require('assert');
const randomer = require('../util/randomer');

describe('y - Array', function() {
	it('Should work without arguments', function() {
		const testCases = [
			{output: () => y(), expected: []},
		];

		for (let i = 0, length = testCases.length; i < length; i++) {
			const tc = testCases[i];
			const output = tc.output();
			const expected = tc.expected;

			assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
		}
	});

	it('Should work with one argument', function() {
		const random = randomer.anything();
		const testCases = [
			{output: () => y(null), expected: [null]},
			{output: () => y(0), expected: [0]},
			{output: () => y(1), expected: [1]},
			{output: () => y('a'), expected: ['a']},
			{output: () => y({a: 1}), expected: [{a: 1}]},
			{output: () => y([1, 2, 3]), expected: [[1, 2, 3]]},
			{output: () => y(random), expected: [random]},
		];

		for (let i = 0, length = testCases.length; i < length; i++) {
			const tc = testCases[i];
			const output = tc.output();
			const expected = tc.expected;

			assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
		}
	});

	it('Should work with many arguments', function() {
		const randomArray = randomer.array(randomer.anything);
		const testCases = [
			{output: () => y(null, false, '', 0, []), expected: [null, false, '', 0, []]},
			{output: () => y(0, 1, 2, 3, 4), expected: [0, 1, 2, 3, 4]},
			{output: () => y([1, 2], [3, 4], [5, 6]), expected: [[1, 2], [3, 4], [5, 6]]},
			{output: () => y({a: 1}, {b: 2}, {c: [3, 4, 5]}), expected: [{a: 1}, {b: 2}, {c: [3, 4, 5]}]},
			{output: () => y(...randomArray), expected: randomArray},
		];

		for (let i = 0, length = testCases.length; i < length; i++) {
			const tc = testCases[i];
			const output = tc.output();
			const expected = tc.expected;

			assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
		}
	});
});