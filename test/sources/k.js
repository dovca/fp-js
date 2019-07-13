module.exports = (functionsModuleName) => () => {
	const {k} = require(`${__dirname}/../../lib/${functionsModuleName}`);
	const assert = require('assert');
	const sinon = require('sinon');

	describe(`${functionsModuleName}/k - If not empty`, function () {
		it('Should work with one function', function () {
			const trueBranch = () => 'foo';
			const spiedTrueBranch = sinon.spy(trueBranch);
			const spiedK = sinon.spy(k);

			spiedK([1, 2, 3], spiedTrueBranch);
			assert.deepStrictEqual(spiedTrueBranch.calledOnce, true, `trueBranch should have been called exactly once`);
			assert.deepStrictEqual(spiedK.calledOnce, true, `k should have been called exactly once`);
			assert.deepStrictEqual(spiedK.getCall(0).returned('foo'), true, `Expected k() to return 'foo'`);

			spiedK([], spiedTrueBranch);
			assert.deepStrictEqual(spiedTrueBranch.calledOnce, true, `trueBranch should still have been called exactly once`);
			assert.deepStrictEqual(spiedK.calledTwice, true, `k should have been called exactly twice`);
			assert.deepStrictEqual(spiedK.getCall(1).returned(undefined), true, `Expected k() to return undefined`);
		});

		it('Should work with two functions', function () {
			const trueBranch = () => 'foo';
			const falseBranch = () => 'bar';
			const spiedTrueBranch = sinon.spy(trueBranch);
			const spiedFalseBranch = sinon.spy(falseBranch);
			const spiedK = sinon.spy(k);

			spiedK([1, 2, 3], spiedTrueBranch, spiedFalseBranch);
			assert.deepStrictEqual(spiedTrueBranch.calledOnce, true, `trueBranch should have been called exactly once`);
			assert.deepStrictEqual(spiedFalseBranch.notCalled, true, `falseBranch should still not have been called yet`);
			assert.deepStrictEqual(spiedK.calledOnce, true, `k should have been called exactly once`);
			assert.deepStrictEqual(spiedK.getCall(0).returned('foo'), true, `Expected k() to return 'foo'`);

			spiedK([], spiedTrueBranch, spiedFalseBranch);
			assert.deepStrictEqual(spiedTrueBranch.calledOnce, true, `trueBranch should still have been called exactly once`);
			assert.deepStrictEqual(spiedFalseBranch.calledOnce, true, `falseBranch should have been called exactly once`);
			assert.deepStrictEqual(spiedK.calledTwice, true, `k should have been called exactly twice`);
			assert.deepStrictEqual(spiedK.getCall(1).returned('bar'), true, `Expected k() to return 'bar'`);
		});
	});
};
