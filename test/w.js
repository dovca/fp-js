const {w} = require('../functions');
const assert = require('assert');
const randomer = require('../util/randomer');
const sinon = require('sinon');

describe('w - While', function() {
	it('Should not do anything with false condition', function() {
		const fn = () => 'foo';

		const spiedFn = sinon.spy(fn);
		const spiedW = sinon.spy(w);

		spiedW(() => false, spiedFn);
		assert.deepStrictEqual(spiedFn.notCalled, true, `fn should have not been called`);
		assert.deepStrictEqual(spiedW.calledOnce, true, `w should have been called exactly once`);
		assert.deepStrictEqual(spiedW.getCall(0).returned(undefined), true, `Expected w() to return undefined`);
	});

	it('Should loop n times', function() {
		const loopCount = randomer.integer(3, 10);
		let a = loopCount;
		const fn = () => --a;

		const spiedFn = sinon.spy(fn);
		const spiedW = sinon.spy(w);

		spiedW(() => a > 0, spiedFn);
		assert.deepStrictEqual(spiedFn.callCount, loopCount, `fn should have been called exactly ${loopCount} times`);
		assert.deepStrictEqual(spiedW.calledOnce, true, `w should have been called exactly once`);
	});
});