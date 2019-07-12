module.exports = (functionsModuleName) => () => {
	const {_} = require(`${__dirname}/../../dist/${functionsModuleName}`);
	const assert = require('assert');
	const randomer = require(`${__dirname}/../../util/randomer`);

	describe(`${functionsModuleName}/_ - Identity`, function () {
		it('Should return anything passed in', function () {
			const data = randomer.array(randomer.anything);
			for (const d of data) {
				const output = _(d);
				const expected = d;
				assert.deepStrictEqual(output, expected, `${output.toString()} should equal ${expected}`);
			}
		})
	});
};
