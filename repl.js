const repl = require('repl');
const fn = require('./lib/functions.js');
const r = repl.start('> ');

Object.keys(fn).forEach((k) => {
	Object.defineProperty(r.context, k, {
		configurable: false,
		enumerable: true,
		value: fn[k]
	});
});

