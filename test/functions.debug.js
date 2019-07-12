const fn = require('./sources/all')('functions.debug');
for (const name in fn) {
	fn[name]();
}