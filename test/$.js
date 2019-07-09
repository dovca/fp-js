const {$} = require('../constructs');
const assert = require('assert');
const randomer = require('../util/randomer');

describe('$', function() {
	it('Should work without a specified function', function() {
		const data = randomer.array(randomer.anything);
		for (const d of data) {
			const output = $(d)();
			const expected = d;
			assert.deepStrictEqual(output, expected, `${output.toString()} should equal ${expected}`);
		}
	});

	it('Should work with a specified function', function() {
		const add = (x) => x + x;
		const concat = (x) => `${x}${x}`;
		const testCases = [
			{output: () => $(-1, add)(), expected: -2},
			{output: () => $(0, add)(), expected: 0},
			{output: () => $(1, add)(), expected: 2},

			{output: () => $('abc', concat)(), expected: 'abcabc'},
			{output: () => $('', concat)(), expected: ''},
			{output: () => $('x', concat)(), expected: 'xx'},
		];

		for (let i = 0, length = testCases.length; i < length; i++) {
			const tc = testCases[i];
			const output = tc.output();
			const expected = tc.expected;

			assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
		}
	});
});