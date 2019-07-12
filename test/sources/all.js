module.exports = (functionModuleName) =>
	[...'$_abcdefghijklmnopqrstuvwxyz'].reduce(
		(s, v) => ({...s, [v]: require(`./${v}`)(functionModuleName)}),
		{}
	);