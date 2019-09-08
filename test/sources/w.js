module.exports = (functionsModuleName) => () => {
	const {w} = require(`${__dirname}/../../lib/${functionsModuleName}`);
	const assert = require('assert');
	const randomer = require(`${__dirname}/../../util/randomer`);
	const sinon = require('sinon');

	describe(`${functionsModuleName}/w - While`, function () {
		it('Should not do anything with false condition', function () {
			const fn = () => 'foo';

			const spiedFn = sinon.spy(fn);
			const spiedW = sinon.spy(w);

			spiedW(() => false, spiedFn);
			assert.deepStrictEqual(spiedFn.notCalled, true, `fn should have not been called`);
			assert.deepStrictEqual(spiedW.calledOnce, true, `w should have been called exactly once`);
			assert.deepStrictEqual(spiedW.getCall(0).returned(0), true, `Expected w() to return 0`);
		});

		it('Should loop n times', function () {
			for (let i = 0; i < 10; i++) {
				const loopCount = randomer.integer(3, 10);
				let a = loopCount;
				const fn = () => --a;

				const spiedFn = sinon.spy(fn);
				const spiedW = sinon.spy(w);

				spiedW(() => a > 0, spiedFn);
				assert.deepStrictEqual(spiedFn.callCount, loopCount, `fn should have been called exactly ${loopCount} times`);
				assert.deepStrictEqual(spiedW.calledOnce, true, `w should have been called exactly once`);
				assert.deepStrictEqual(spiedW.getCall(0).returned(0), true, `Expected w() to return 0`);
			}
		});

		it('Should use the default value of third argument', function () {
			const output = w((C) => C < 5, (C) => ++C);
			const expected = 5;

			assert.deepStrictEqual(output, expected, `Test case #0: ${output} should equal ${expected}`);
		});

		it('Should use the user-provided value of third argument', function () {
			for (let i = 0; i < 10; i++) {
				const fn = ([A, ...B]) => B;
				const spiedFn = sinon.spy(fn);
				const randomLength = randomer.integer(3, 10);
				const randomArray = randomer.array(randomer.integer, randomLength);

				const output = w((A) => A.length > 0, spiedFn, randomArray);
				const expected = [];

				assert.deepStrictEqual(output, expected, `${output} should equal ${expected}`);
				assert.deepStrictEqual(spiedFn.callCount, randomLength, `fn should have been called exactly ${randomLength} times`);
			}
		});
	});
};
