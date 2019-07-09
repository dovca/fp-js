const {i} = require('../constructs');
const assert = require('assert');
const randomer = require('../util/randomer');
const sinon = require('sinon');

describe('i', function() {
	it('Should work with one function', function() {
		const trueBranch = () => 'foo';

		const spiedTrueBranch = sinon.spy(trueBranch);
		const spiedI = sinon.spy(i);

		spiedI(() => true, spiedTrueBranch);
		assert.deepStrictEqual(spiedTrueBranch.calledOnce, true, `trueBranch should have been called exactly once`);
		assert.deepStrictEqual(spiedI.calledOnce, true, `i should have been called exactly once`);
		assert.deepStrictEqual(spiedI.getCall(0).returned('foo'), true, `Expected i() to return 'foo'`);

		spiedI(() => false, spiedTrueBranch);
		assert.deepStrictEqual(spiedTrueBranch.calledOnce, true, `trueBranch should still have been called exactly once`);
		assert.deepStrictEqual(spiedI.calledTwice, true, `i should have been called exactly twice`);
		assert.deepStrictEqual(spiedI.getCall(1).returned(undefined), true, `Expected i() to return undefined`);
	});

	it('Should work with two functions', function() {
		const trueBranch = () => 'foo';
		const falseBranch = () => 'bar';
		const spiedTrueBranch = sinon.spy(trueBranch);
		const spiedFalseBranch = sinon.spy(falseBranch);
		const spiedI = sinon.spy(i);

		spiedI(() => true, spiedTrueBranch, spiedFalseBranch);
		assert.deepStrictEqual(spiedTrueBranch.calledOnce, true, `trueBranch should have been called exactly once`);
		assert.deepStrictEqual(spiedFalseBranch.notCalled, true, `falseBranch should still not have been called yet`);
		assert.deepStrictEqual(spiedI.calledOnce, true, `i should have been called exactly once`);
		assert.deepStrictEqual(spiedI.getCall(0).returned('foo'), true, `Expected i() to return 'foo'`);

		spiedI(() => false, spiedTrueBranch, spiedFalseBranch);
		assert.deepStrictEqual(spiedTrueBranch.calledOnce, true, `trueBranch should still have been called exactly once`);
		assert.deepStrictEqual(spiedFalseBranch.calledOnce, true, `falseBranch should have been called exactly once`);
		assert.deepStrictEqual(spiedI.calledTwice, true, `i should have been called exactly twice`);
		assert.deepStrictEqual(spiedI.getCall(1).returned('bar'), true, `Expected i() to return 'bar'`);
	});
});