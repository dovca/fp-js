module.exports = (functionsModuleName) => () => {
	const {r} = require(`${__dirname}/../../lib/${functionsModuleName}`);
	const assert = require('assert');
	const {spy} = require('sinon');

	describe(`${functionsModuleName}/r - Reduce`, function () {
		const sum = (a, b) => a + b;
		const or = (a, b) => a || b;
		const not = (a) => !a;

		it('Should work without arguments', function () {
			const testCases = [
				{output: () => r(), expected: undefined},
			];

			for (let i = 0, length = testCases.length; i < length; i++) {
				const tc = testCases[i];
				const output = tc.output();
				const expected = tc.expected;

				assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
			}
		});

		it('Should work with function and no other arguments', function () {
			const spiedOr = spy(or);
			const spiedU = spy(r);

			spiedU(spiedOr);
			assert.deepStrictEqual(spiedOr.notCalled, true, `function passed to r should not have been called`);
			assert.deepStrictEqual(spiedU.getCall(0).returned(undefined), true, `Expected r() to return undefined`);
		});

		it('Should work with function and one argument', function () {
			const spiedOr = spy(or);
			const spiedNot = spy(or);
			const spiedSum = spy(or);

			const testCases = [
				{output: () => r(spiedOr, true), expected: true},
				{output: () => r(spiedOr, false), expected: false},
				{output: () => r(spiedNot, true), expected: true},
				{output: () => r(spiedSum, 1), expected: 1},
				{output: () => r(spiedSum, 50), expected: 50},
				{output: () => r(spiedSum, 0), expected: 0},
			];

			for (let i = 0, length = testCases.length; i < length; i++) {
				const tc = testCases[i];
				const output = tc.output();
				const expected = tc.expected;

				assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
			}

			assert.deepStrictEqual(spiedOr.notCalled, true, `function 'or' passed to r should not have been called`);
			assert.deepStrictEqual(spiedNot.notCalled, true, `function 'not' to r should not have been called`);
			assert.deepStrictEqual(spiedSum.notCalled, true, `function 'sum to r should not have been called`);
		});

		it('Should work with function and two arguments', function () {
			const testCases = [
				{output: () => r(or, true, true), expected: true},
				{output: () => r(or, false, true), expected: true},
				{output: () => r(or, true, false), expected: true},
				{output: () => r(or, false, false), expected: false},
				{output: () => r(sum, 1, 2), expected: 3},
				{output: () => r(sum, 50, 100), expected: 150},
				{output: () => r(sum, 0, 0), expected: 0},
			];

			for (let i = 0, length = testCases.length; i < length; i++) {
				const tc = testCases[i];
				const output = tc.output();
				const expected = tc.expected;

				assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
			}
		});

		it('Should work with function and many arguments', function () {
			const testCases = [
				{output: () => r(or, true, true, true, true), expected: true},
				{output: () => r(or, true, true, true, false), expected: true},
				{output: () => r(or, true, true, false, true), expected: true},
				{output: () => r(or, true, true, false, false), expected: true},
				{output: () => r(or, true, false, true, true), expected: true},
				{output: () => r(or, true, false, true, false), expected: true},
				{output: () => r(or, true, false, false, true), expected: true},
				{output: () => r(or, true, false, false, false), expected: true},
				{output: () => r(or, false, true, true, true), expected: true},
				{output: () => r(or, false, true, true, false), expected: true},
				{output: () => r(or, false, true, false, true), expected: true},
				{output: () => r(or, false, true, false, false), expected: true},
				{output: () => r(or, false, false, true, true), expected: true},
				{output: () => r(or, false, false, true, false), expected: true},
				{output: () => r(or, false, false, false, true), expected: true},
				{output: () => r(or, false, false, false, false), expected: false},

				{output: () => r(sum, 1, 2, 3, 4, 5), expected: 15},
				{output: () => r(sum, 1, 1, 1, 1, 1, 1), expected: 6},
				{output: () => r(sum, 1, -1, 1, -1, 1, -1), expected: 0},
				{output: () => r(sum, -1, -1, -1, -1, -1, -1), expected: -6},
				{output: () => r(sum, -1, 1, -1, 1, -1, 1), expected: 0},
				{output: () => r(sum, 0, 0, 0, 0, 1), expected: 1},
				{output: () => r(sum, 0, 0, 0, 1, 0), expected: 1},
				{output: () => r(sum, 0, 0, 1, 0, 0), expected: 1},
				{output: () => r(sum, 0, 1, 0, 0, 0), expected: 1},
				{output: () => r(sum, 1, 0, 0, 0, 0), expected: 1},
				{output: () => r(sum, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1), expected: 15},
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
