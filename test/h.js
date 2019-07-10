const {h} = require('../constructs');
const assert = require('assert');
const randomer = require('../util/randomer');
const sinon = require('sinon');

describe('h - Switch', function() {
	const fn = (x) => x;

	it('Should work without default case', function() {
		const spiedH = sinon.spy(h);
		const spiedCase = sinon.spy(() => 'foo');

		spiedH(
			[() => false, spiedCase],
			[() => false, spiedCase],
			[() => false, spiedCase],
		);
		assert.deepStrictEqual(spiedH.calledOnce, true, `h should have been called exactly once`);
		assert.deepStrictEqual(spiedCase.notCalled, true, `no case should have been executed`);
		assert.deepStrictEqual(spiedH.getCall(0).returned(undefined), true, `Expected h() to return undefined`);
	});

	it('Should work with only default case', function() {
		const spiedH = sinon.spy(h);
		const spiedDefault = sinon.spy(() => null);

		spiedH([(v) => true, spiedDefault]);
		assert.deepStrictEqual(spiedH.calledOnce, true, `h should have been called exactly once`);
		assert.deepStrictEqual(spiedDefault.calledOnce, true, `default case should have been executed`);
		assert.deepStrictEqual(spiedH.getCall(0).returned(null), true, `Expected h() to return null`);
	});

	it('Should fall to default case', function() {
		const spiedH = sinon.spy(h);
		const spiedCase = sinon.spy(() => 'foo');
		const spiedDefault = sinon.spy(() => null);

		spiedH(
			[() => false, spiedCase],
			[() => false, spiedCase],
			[() => false, spiedCase],
			[() => true, spiedDefault]
		);
		assert.deepStrictEqual(spiedH.calledOnce, true, `h should have been called exactly once`);
		assert.deepStrictEqual(spiedCase.notCalled, true, `default case should have been executed`);
		assert.deepStrictEqual(spiedDefault.calledOnce, true, `default case should have been executed`);
		assert.deepStrictEqual(spiedH.getCall(0).returned(null), true, `Expected h() to return null`);
	});

	it('Should only execute first true case', function() {
		const spiedH = sinon.spy(h);
		const spiedCaseTrue = sinon.spy(() => 'foo');
		const spiedCaseFalse = sinon.spy(() => 'bar');
		const spiedDefault = sinon.spy(() => null);

		spiedH(
			[() => false, spiedCaseFalse],
			[() => true, spiedCaseTrue],
			[() => false, spiedCaseFalse],
			[() => true, spiedDefault]
		);
		assert.deepStrictEqual(spiedH.calledOnce, true, `h should have been called exactly once`);
		assert.deepStrictEqual(spiedCaseTrue.calledOnce, true, `true case should have been executed`);
		assert.deepStrictEqual(spiedCaseFalse.notCalled, true, `false cases should not have been executed`);
		assert.deepStrictEqual(spiedDefault.notCalled, true, `default case should not have been executed`);
		assert.deepStrictEqual(spiedH.getCall(0).returned('foo'), true, `Expected h() to return 'foo'`);
	});
});