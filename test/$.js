const {$} = require('../constructs');
const assert = require('assert');
const randomer = require('../util/randomer');

describe('$ - Function wrap', function() {
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
			{output: () => $(add, -1)(), expected: -2},
			{output: () => $(add, 0)(), expected: 0},
			{output: () => $(add, 1)(), expected: 2},

			{output: () => $(concat, 'abc')(), expected: 'abcabc'},
			{output: () => $(concat, '')(), expected: ''},
			{output: () => $(concat, 'x')(), expected: 'xx'},
		];

		for (let i = 0, length = testCases.length; i < length; i++) {
			const tc = testCases[i];
			const output = tc.output();
			const expected = tc.expected;

			assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
		}
	});
});