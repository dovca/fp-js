module.exports = (functionsModuleName) => () => {
	const {u} = require(`${__dirname}/../../lib/${functionsModuleName}`);
	const assert = require('assert');

	describe(`${functionsModuleName}/u - Curry`, function () {
		const sum = (a, b) => a + b;
		const multiply = (a, b) => a * b;

		it('Should work for binary functions by default', function () {
			const curriedSum = u(sum);
			const curriedMultiply = u(multiply);
			const testCases = [
				{output: () => curriedSum(0)(0), expected: 0},
				{output: () => curriedSum(0)(1), expected: 1},
				{output: () => curriedSum(1)(2), expected: 3},
				{output: () => curriedSum(1000)(500), expected: 1500},
				{output: () => curriedSum(-100)(500), expected: 400},
				{output: () => curriedMultiply(0)(5), expected: 0},
				{output: () => curriedMultiply(-10)(10), expected: -100},
				{output: () => curriedMultiply(6)(6), expected: 36},
			];

			for (let i = 0, length = testCases.length; i < length; i++) {
				const tc = testCases[i];
				const output = tc.output();
				const expected = tc.expected;

				assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
			}
		});

		it('Should work for function of any arity', function () {
			const curried1 = u((a) => -a, 1);
			const curried2 = u(sum, 2);
			const curried3 = u((a, b, c) => a + b + c, 3);
			const curried5 = u((a, b, c, d, e) => (a + b) * c - d * e, 5);
			const testCases = [
				{output: () => curried1(1), expected: -1},
				{output: () => curried1(-42), expected: 42},
				{output: () => curried2(3)(4), expected: 7},
				{output: () => curried3(1)(10)(100), expected: 111},
				{output: () => curried3(1)(1)(1), expected: 3},
				{output: () => curried5(1)(2)(3)(4)(5), expected: -11},
				{output: () => curried5(5)(4)(3)(2)(1), expected: 25},
			];

			for (let i = 0, length = testCases.length; i < length; i++) {
				const tc = testCases[i];
				const output = tc.output();
				const expected = tc.expected;

				assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
			}
		});
	});
};
