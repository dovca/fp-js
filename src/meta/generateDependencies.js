const fs = require('fs');
const definitionsPath = `${__dirname}/../partials/definitions.js`;
const operatorRegex = /[-?!^%+*/<&|]|={2,}|(?<!=)>/;
const lines = fs.readFileSync(definitionsPath).toString().split('\n');
const cachedValues = lines
	.filter((line) => /^[A-Z] = /.test(line))
	.map((line) => line.charAt(0));
const definitionLines = lines
	.filter((line) => /^[$_a-z] = /.test(line))
	.map((line) => cachedValues.reduce(
		(s, v) => s.replace(new RegExp(v, 'g'), v.toLowerCase()), //Replace cached values with their functions
		line
	));
const functionCodes = new Map();
const dependencyCache = new Map();
const dependencyStorage = new Map();
const isADependentOnB = (a, b) => {
	const cacheKey = `${a}${b}`;

	if (!dependencyCache.has(cacheKey)) {
		const cacheKeyInverse = `${b}${a}`;
		dependencyCache.set(cacheKey, [...dependenciesOf(a)].includes(b));
	}

	return dependencyCache.get(cacheKey);
};
const dependenciesOf = (a) => {
	const dependencies = dependencyStorage.get(a);
	return dependencies.size
		? new Set([...dependencies, ...[...dependencies].reduce((s, v) => v === a ? s : [...s, ...dependenciesOf(v)], [])])
		: dependencies;
};

for (const line of definitionLines) {
	const functionName = line.charAt(0);
	const functionCode = line.replace(/^[$_\w\s=]+\s/, '');
	const dependencies = new Set([...functionCode.replace(/[^$_a-z]/g, '')]);

	dependencyStorage.set(functionName, dependencies);
	functionCodes.set(functionName, functionCode);
}

for (const [functionName, dependencies] of dependencyStorage) {
	for (const a of dependencies) {
		if (a === functionName) {
			continue;
		}

		for (const b of dependencies) {
			if (a === b) {
				continue;
			}

			if (isADependentOnB(a, b)) {
				dependencies.delete(b);
			}
		}
	}
}

const independentFunctions = [...dependencyStorage.keys()].filter((k) => !dependencyStorage.get(k).size);
const operatorUsingFunctions = [...functionCodes.keys()].filter((k) => operatorRegex.test(functionCodes.get(k)));
const q = (str) => `"${str}"`;

process.stdout.write(`digraph dependencies {
	{ rank=sink; ${independentFunctions.map(q).join(';')} }
	${operatorUsingFunctions.map((f) => `"${f}"[style=filled]`).join(';')}
	${[...dependencyStorage].map(([f, d]) => d.size ? [...d].map((v) => `${q(f)}->${q(v)}`).join(';') : `${q(f)}`).join(';')}
}
`);