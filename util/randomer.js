const basicAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const choose = (x) =>  x[Math.floor(Math.random() * x.length)];

const boolean = () => choose([true, false]);

const character = (alphabet = basicAlphabet) => choose(alphabet);

const integer = (from = 0, to = 100) => from + Math.floor(Math.random() * (to - from));

const array = (seederFunction = integer, length = 10) => {
	const result = [];
	for (let i = 0; i < length; i++) {
		result.push(seederFunction(i));
	}
	return result;
};

const text = (length = 10, alphabet = basicAlphabet) => array(() => character(alphabet), length).join('');

const object = (propertyCount = 3, keyFunction = text, valueFunction = integer) => {
	const result = {};
	for (let i = 0; i < propertyCount; i++) {
		let key;
		do {
			key = keyFunction(i);
		} while (result.hasOwnProperty(key));

		result[key] = valueFunction(i);
	}
	return result;
};

const anything = () => choose([
	boolean,
	character,
	integer,
	array,
	text,
	object
])();

module.exports = {
	choose,
	boolean,
	character,
	integer,
	text,
	array,
	object,
	anything
};

