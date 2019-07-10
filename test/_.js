const {_} = require('../constructs');
const assert = require('assert');
const randomer = require('../util/randomer');

describe('_ - Identity', function() {
	it('Should return anything passed in', function() {
		const data = randomer.array(randomer.anything);
		for (const d of data) {
			const output = _(d);
			const expected = d;
			assert.deepStrictEqual(output, expected, `${output.toString()} should equal ${expected}`);
		}
	})
});