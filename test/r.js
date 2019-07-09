const {r} = require('../constructs');
const assert = require('assert');
const randomer = require('../util/randomer');
const sinon = require('sinon');

describe('r', function() {
	const fn = (x) => x;

	it('Should not do anything with empty array', function() {
		const spiedFn = sinon.spy(fn);
		const spiedR = sinon.spy(r);

		spiedR([], spiedFn);
		assert.deepStrictEqual(spiedFn.notCalled, true, `fn should have not been called`);
		assert.deepStrictEqual(spiedR.calledOnce, true, `r should have been called exactly once`);
		assert.deepStrictEqual(spiedR.getCall(0).returned(undefined), true, `Expected r() to return undefined`);
	});

	it('Should work with array of length 1', function() {
		const spiedFn = sinon.spy(fn);
		const spiedR = sinon.spy(r);

		spiedR([1], spiedFn);
		assert.deepStrictEqual(spiedFn.calledOnce, true, `fn should have been called exactly once`);
		assert.deepStrictEqual(spiedR.calledOnce, true, `r should have been called exactly once`);
		assert.deepStrictEqual(spiedR.getCall(0).returned(undefined), true, `Expected r() to return undefined`);
	});

	it('Should work with array of any length', function() {
		const spiedFn = sinon.spy(fn);
		const spiedR = sinon.spy(r);
		const length = randomer.integer(5, 20);

		spiedR(randomer.array((i) => -i, length), spiedFn);
		assert.deepStrictEqual(spiedFn.callCount, length, `fn should have been called exactly ${length} times`);

		for (let i = 0; i < length; i++) {
			assert.deepStrictEqual(spiedFn.getCall(i).returned(-i), true, `callback function should have returned ${-i}`);
		}

		assert.deepStrictEqual(spiedR.getCall(0).returned(undefined), true, `Expected r() to return undefined`);
	});
});