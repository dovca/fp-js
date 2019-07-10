const {e} = require('../constructs');
const assert = require('assert');
const randomer = require('../util/randomer');

describe('e - Equal', function() {
	it('Should work with undefined', function() {
		const testCases = [
			{output: () => e(undefined, undefined), expected: true},
			{output: () => e(undefined, null), expected: false},
			{output: () => e(undefined, false), expected: false},
			{output: () => e(undefined, true), expected: false},
			{output: () => e(undefined, NaN), expected: false},
			{output: () => e(undefined, ''), expected: false},
			{output: () => e(undefined, 'abc'), expected: false},
			{output: () => e(undefined, []), expected: false},
			{output: () => e(undefined, [1, 2, 3]), expected: false},
			{output: () => e(undefined, {}), expected: false},
			{output: () => e(undefined, {a: 1}), expected: false},
			{output: () => e(undefined, 30), expected: false},
			{output: () => e(undefined, 0), expected: false},
		];

		for (let i = 0, length = testCases.length; i < length; i++) {
			const tc = testCases[i];
			const output = tc.output();
			const expected = tc.expected;

			assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
		}
	});

	it('Should work with null', function() {
		const testCases = [
			{output: () => e(null, undefined), expected: false},
			{output: () => e(null, null), expected: true},
			{output: () => e(null, false), expected: false},
			{output: () => e(null, true), expected: false},
			{output: () => e(null, NaN), expected: false},
			{output: () => e(null, ''), expected: false},
			{output: () => e(null, 'abc'), expected: false},
			{output: () => e(null, []), expected: false},
			{output: () => e(null, [1, 2, 3]), expected: false},
			{output: () => e(null, {}), expected: false},
			{output: () => e(null, {a: 1}), expected: false},
			{output: () => e(null, 30), expected: false},
			{output: () => e(null, 0), expected: false},
		];

		for (let i = 0, length = testCases.length; i < length; i++) {
			const tc = testCases[i];
			const output = tc.output();
			const expected = tc.expected;

			assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
		}
	});

	it('Should work with false', function() {
		const testCases = [
			{output: () => e(false, undefined), expected: false},
			{output: () => e(false, null), expected: false},
			{output: () => e(false, false), expected: true},
			{output: () => e(false, true), expected: false},
			{output: () => e(false, NaN), expected: false},
			{output: () => e(false, ''), expected: false},
			{output: () => e(false, 'abc'), expected: false},
			{output: () => e(false, []), expected: false},
			{output: () => e(false, [1, 2, 3]), expected: false},
			{output: () => e(false, {}), expected: false},
			{output: () => e(false, {a: 1}), expected: false},
			{output: () => e(false, 30), expected: false},
			{output: () => e(false, 0), expected: false},
		];

		for (let i = 0, length = testCases.length; i < length; i++) {
			const tc = testCases[i];
			const output = tc.output();
			const expected = tc.expected;

			assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
		}
	});

	it('Should work with true', function() {
		const testCases = [
			{output: () => e(true, undefined), expected: false},
			{output: () => e(true, null), expected: false},
			{output: () => e(true, false), expected: false},
			{output: () => e(true, true), expected: true},
			{output: () => e(true, NaN), expected: false},
			{output: () => e(true, ''), expected: false},
			{output: () => e(true, 'abc'), expected: false},
			{output: () => e(true, []), expected: false},
			{output: () => e(true, [1, 2, 3]), expected: false},
			{output: () => e(true, {}), expected: false},
			{output: () => e(true, {a: 1}), expected: false},
			{output: () => e(true, 30), expected: false},
			{output: () => e(true, 0), expected: false},
		];

		for (let i = 0, length = testCases.length; i < length; i++) {
			const tc = testCases[i];
			const output = tc.output();
			const expected = tc.expected;

			assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
		}
	});

	it('Should work with NaN', function() {
		const testCases = [
			{output: () => e(NaN, undefined), expected: false},
			{output: () => e(NaN, null), expected: false},
			{output: () => e(NaN, false), expected: false},
			{output: () => e(NaN, true), expected: false},
			{output: () => e(NaN, NaN), expected: false}, //NaN does not equal anything
			{output: () => e(NaN, ''), expected: false},
			{output: () => e(NaN, 'abc'), expected: false},
			{output: () => e(NaN, []), expected: false},
			{output: () => e(NaN, [1, 2, 3]), expected: false},
			{output: () => e(NaN, {}), expected: false},
			{output: () => e(NaN, {a: 1}), expected: false},
			{output: () => e(NaN, 30), expected: false},
			{output: () => e(NaN, 0), expected: false},
		];

		for (let i = 0, length = testCases.length; i < length; i++) {
			const tc = testCases[i];
			const output = tc.output();
			const expected = tc.expected;

			assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
		}
	});

	it('Should work with empty string', function() {
		const testCases = [
			{output: () => e('', undefined), expected: false},
			{output: () => e('', null), expected: false},
			{output: () => e('', false), expected: false},
			{output: () => e('', true), expected: false},
			{output: () => e('', NaN), expected: false},
			{output: () => e('', ''), expected: true},
			{output: () => e('', 'abc'), expected: false},
			{output: () => e('', []), expected: false},
			{output: () => e('', [1, 2, 3]), expected: false},
			{output: () => e('', {}), expected: false},
			{output: () => e('', {a: 1}), expected: false},
			{output: () => e('', 30), expected: false},
			{output: () => e('', 0), expected: false},
		];

		for (let i = 0, length = testCases.length; i < length; i++) {
			const tc = testCases[i];
			const output = tc.output();
			const expected = tc.expected;

			assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
		}
	});

	it('Should work with non-empty string', function() {
		const testCases = [
			{output: () => e('abc', undefined), expected: false},
			{output: () => e('abc', null), expected: false},
			{output: () => e('abc', false), expected: false},
			{output: () => e('abc', true), expected: false},
			{output: () => e('abc', NaN), expected: false},
			{output: () => e('abc', ''), expected: false},
			{output: () => e('abc', 'abc'), expected: true},
			{output: () => e('abc', []), expected: false},
			{output: () => e('abc', [1, 2, 3]), expected: false},
			{output: () => e('abc', {}), expected: false},
			{output: () => e('abc', {a: 1}), expected: false},
			{output: () => e('abc', 30), expected: false},
			{output: () => e('abc', 0), expected: false},
		];

		for (let i = 0, length = testCases.length; i < length; i++) {
			const tc = testCases[i];
			const output = tc.output();
			const expected = tc.expected;

			assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
		}
	});

	it('Should work with empty array', function() {
		const arr = [];
		const testCases = [
			{output: () => e([], undefined), expected: false},
			{output: () => e([], null), expected: false},
			{output: () => e([], false), expected: false},
			{output: () => e([], true), expected: false},
			{output: () => e([], NaN), expected: false},
			{output: () => e([], ''), expected: false},
			{output: () => e([], 'abc'), expected: false},
			{output: () => e([], []), expected: false},
			{output: () => e([], [1, 2, 3]), expected: false},
			{output: () => e([], {}), expected: false},
			{output: () => e([], {a: 1}), expected: false},
			{output: () => e([], 30), expected: false},
			{output: () => e([], 0), expected: false},
			{output: () => e([], arr), expected: false},
			{output: () => e(arr, arr), expected: true},
		];

		for (let i = 0, length = testCases.length; i < length; i++) {
			const tc = testCases[i];
			const output = tc.output();
			const expected = tc.expected;

			assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
		}
	});

	it('Should work with non-empty array', function() {
		const arr = [1, 2, 3];
		const testCases = [
			{output: () => e([1, 2, 3], undefined), expected: false},
			{output: () => e([1, 2, 3], null), expected: false},
			{output: () => e([1, 2, 3], false), expected: false},
			{output: () => e([1, 2, 3], true), expected: false},
			{output: () => e([1, 2, 3], NaN), expected: false},
			{output: () => e([1, 2, 3], ''), expected: false},
			{output: () => e([1, 2, 3], 'abc'), expected: false},
			{output: () => e([1, 2, 3], []), expected: false},
			{output: () => e([1, 2, 3], [1, 2, 3]), expected: false},
			{output: () => e([1, 2, 3], {}), expected: false},
			{output: () => e([1, 2, 3], {a: 1}), expected: false},
			{output: () => e([1, 2, 3], 30), expected: false},
			{output: () => e([1, 2, 3], 0), expected: false},
			{output: () => e([1, 2, 3], arr), expected: false},
			{output: () => e(arr, arr), expected: true},
		];

		for (let i = 0, length = testCases.length; i < length; i++) {
			const tc = testCases[i];
			const output = tc.output();
			const expected = tc.expected;

			assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
		}
	});

	it('Should work with empty object', function() {
		const obj = {a: 1};
		const testCases = [
			{output: () => e({}, undefined), expected: false},
			{output: () => e({}, null), expected: false},
			{output: () => e({}, false), expected: false},
			{output: () => e({}, true), expected: false},
			{output: () => e({}, NaN), expected: false},
			{output: () => e({}, ''), expected: false},
			{output: () => e({}, 'abc'), expected: false},
			{output: () => e({}, []), expected: false},
			{output: () => e({}, [1, 2, 3]), expected: false},
			{output: () => e({}, {}), expected: false},
			{output: () => e({}, {a: 1}), expected: false},
			{output: () => e({}, 30), expected: false},
			{output: () => e({}, 0), expected: false},
			{output: () => e({}, obj), expected: false},
			{output: () => e(obj, obj), expected: true},
		];

		for (let i = 0, length = testCases.length; i < length; i++) {
			const tc = testCases[i];
			const output = tc.output();
			const expected = tc.expected;

			assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
		}
	});

	it('Should work with non-empty object', function() {
		const obj = {a: 1};
		const testCases = [
			{output: () => e({a: 1}, undefined), expected: false},
			{output: () => e({a: 1}, null), expected: false},
			{output: () => e({a: 1}, false), expected: false},
			{output: () => e({a: 1}, true), expected: false},
			{output: () => e({a: 1}, NaN), expected: false},
			{output: () => e({a: 1}, ''), expected: false},
			{output: () => e({a: 1}, 'abc'), expected: false},
			{output: () => e({a: 1}, []), expected: false},
			{output: () => e({a: 1}, [1, 2, 3]), expected: false},
			{output: () => e({a: 1}, {}), expected: false},
			{output: () => e({a: 1}, {a: 1}), expected: false},
			{output: () => e({a: 1}, 30), expected: false},
			{output: () => e({a: 1}, 0), expected: false},
			{output: () => e({a: 1}, obj), expected: false},
			{output: () => e(obj, obj), expected: true},
		];

		for (let i = 0, length = testCases.length; i < length; i++) {
			const tc = testCases[i];
			const output = tc.output();
			const expected = tc.expected;

			assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
		}
	});

	it('Should work with zero', function() {
		const testCases = [
			{output: () => e(0, undefined), expected: false},
			{output: () => e(0, null), expected: false},
			{output: () => e(0, false), expected: false},
			{output: () => e(0, true), expected: false},
			{output: () => e(0, NaN), expected: false},
			{output: () => e(0, ''), expected: false},
			{output: () => e(0, 'abc'), expected: false},
			{output: () => e(0, []), expected: false},
			{output: () => e(0, [1, 2, 3]), expected: false},
			{output: () => e(0, {}), expected: false},
			{output: () => e(0, {a: 1}), expected: false},
			{output: () => e(0, 30), expected: false},
			{output: () => e(0, 0), expected: true},
		];

		for (let i = 0, length = testCases.length; i < length; i++) {
			const tc = testCases[i];
			const output = tc.output();
			const expected = tc.expected;

			assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
		}
	});

	it('Should work with non-zero number', function() {
		const testCases = [
			{output: () => e(30, undefined), expected: false},
			{output: () => e(30, null), expected: false},
			{output: () => e(30, false), expected: false},
			{output: () => e(30, true), expected: false},
			{output: () => e(30, NaN), expected: false},
			{output: () => e(30, ''), expected: false},
			{output: () => e(30, 'abc'), expected: false},
			{output: () => e(30, []), expected: false},
			{output: () => e(30, [1, 2, 3]), expected: false},
			{output: () => e(30, {}), expected: false},
			{output: () => e(30, {a: 1}), expected: false},
			{output: () => e(30, 30), expected: true},
			{output: () => e(30, 0), expected: false},
		];

		for (let i = 0, length = testCases.length; i < length; i++) {
			const tc = testCases[i];
			const output = tc.output();
			const expected = tc.expected;

			assert.deepStrictEqual(output, expected, `Test case #${i}: ${output} should equal ${expected}`);
		}
	});
});