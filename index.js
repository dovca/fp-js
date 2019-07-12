const repl = require('repl');
const fn = require('./dist/functions.debug');
console.log(fn);

const r = repl.start('> ');

Object.keys(fn).forEach((k) => {
	Object.defineProperty(r.context, k, {
		configurable: false,
		enumerable: true,
		value: fn[k]
	});
});

