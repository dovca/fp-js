const debugBuffer = [];

const clearDebugBuffer = () => {
	debugBuffer.splice(0);
};

const getDebugBuffer = () => debugBuffer.slice(0);

const record = (name) =>  {
	debugBuffer.push(name);
};

const wrap = (fn, name) => (...args) => {
	record(name);
	const result = fn(...args);
	record('-');
	return result;
};

module.exports = {
	clearDebugBuffer,
	getDebugBuffer,
	record,
	wrap
};