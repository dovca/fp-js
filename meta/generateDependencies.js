const fs = require('fs');
const path = require('path');
const {exec} = require('child_process');
const definitionsPath = path.join(__dirname, '../src/partials/definitions.js');
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
const tooltips = new Map(
	lines
		.filter((line) => /^ \* [$_a-z] - /.test(line))
		.map((line) => [line.substring(3, 4), line.slice(3)])
);

const functionCodes = new Map();
const dependencyCache = new Map();
const dependencyStorage = new Map();
const inverseDependencyStorage = new Map();
const isADependentOnB = (a, b) => {
	const cacheKey = `${a}${b}`;

	if (!dependencyCache.has(cacheKey)) {
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

const inverseDependenciesOf = (a) => {
	const dependencies = inverseDependencyStorage.get(a);
	return dependencies.size
		? new Set([...dependencies, ...[...dependencies].reduce((s, v) => v === a ? s : [...s, ...inverseDependenciesOf(v)], [])])
		: dependencies;
};

for (const line of definitionLines) {
	const functionName = line.charAt(0);
	const functionCode = line.replace(/^[$_\w\s=]+\s/, '');
	const dependencies = new Set([...functionCode.replace(/[^$_a-z]/g, '')]);

	dependencyStorage.set(functionName, dependencies);
	functionCodes.set(functionName, functionCode);

	if (!inverseDependencyStorage.has(functionName)) {
		inverseDependencyStorage.set(functionName, new Set());
	}

	for (const dep of dependencies) {
		if (!inverseDependencyStorage.has(dep)) {
			inverseDependencyStorage.set(dep, new Set());
		}
		inverseDependencyStorage.get(dep).add(functionName);
	}
}

const deepDependencyStorageSource = `new Map([${[...dependencyStorage].map(([f]) => `["${f}", new Set([${[...dependenciesOf(f)].map((fn) => `"${fn}"`)}])]`).join(',\n')}])`;
const deepInverseDependencyStorageSource = `new Map([${[...inverseDependencyStorage].map(([f]) => `["${f}", new Set([${[...inverseDependenciesOf(f)].map((fn) => `"${fn}"`)}])]`).join(',\n')}])`;

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

//Possibly include { rank=sink; ${independentFunctions.map(q).join(';')} }
const dotSourceCode = `digraph "" {
	
	${[...tooltips].map(([k, v]) => `"${k}"[tooltip="${v}"]`).join(';')}
	${operatorUsingFunctions.map((f) => `"${f}"[shape=rectangle]`).join(';')}
	${[...dependencyStorage].map(([f, d]) => d.size ? [...d].map((v) => `${q(f)}->${q(v)}`).join(';') : `${q(f)}`).join(';')}
}`;

exec(`echo '${dotSourceCode}' | dot -Tsvg`, (error, stdout, stderr) => {
	if (error) {
		console.log(error, stderr);
		return;
	}

	const svgScriptPartial = fs.readFileSync(path.join(__dirname, '../src/partials/dependencyGraphScript.js')).toString();
	const svgStylePartial = fs.readFileSync(path.join(__dirname, '../src/partials/dependencyGraphStyle.css')).toString();

	const finalSvgCode = stdout.replace(
		'</svg>',
		`<style>${svgStylePartial}</style>
		<script id="graph-dependencies-script">
			var dependencies = ${deepDependencyStorageSource};
			var inverseDependencies = ${deepInverseDependencyStorageSource};
			${svgScriptPartial}
		</script>
		</svg>`
	);

	fs.writeFileSync(path.join(__dirname, '../output/dependencies.svg'), finalSvgCode);
});