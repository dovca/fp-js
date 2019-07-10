const repl = require('repl');
const constructs = require('./constructs');

const r = repl.start('> ');

Object.keys(constructs).forEach((k) => {
	Object.defineProperty(r.context, k, {
		configurable: false,
		enumerable: true,
		value: constructs[k]
	});
});

