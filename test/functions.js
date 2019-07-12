const fn = require('./sources/all')('functions');
for (const name in fn) {
	fn[name]();
}