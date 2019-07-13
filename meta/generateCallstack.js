const path = require('path');
const {$, _, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, getDebugBuffer} = require(path.join(__dirname, '../dist/functions.debug'));
const {exec} = require('child_process');
const {createHash} = require('crypto');
const command = process.argv[2];
const commandHash = createHash('sha1').update(command).digest('hex').slice(0, 8);
const commandSlug = `${command.replace(/[^$_a-z]/g, '')}-${commandHash}`;
const outputDirectory = path.join(__dirname, `../output`);
const outputPath = path.join(outputDirectory, `callstack-${commandSlug}.svg`);

eval(command);

let stackDepth = 0;
let maxDepth = stackDepth;
const buffer = getDebugBuffer();
const plotData = [`0 0`].concat(
	buffer.map((v, i) => {
		const isPop = v === '-';
		stackDepth = stackDepth + (isPop ? -1 : 1);
		maxDepth = Math.max(maxDepth, stackDepth);

		return `${i + 1} ${stackDepth} ${isPop ? '' : v}`;
	})
);

const outputSize = [
	Math.min(Math.max(600, (buffer.length) * 10 + 80), 8000),
	Math.min(Math.max(400, (maxDepth + 1) * 10 + 100), 1000)
];

const gnuplotCommands = `
$data << EOD
${plotData.join('\n')}
EOD

set terminal svg background rgb "white" size ${outputSize}
set output "${outputPath}"
set xtics nomirror
set ytics nomirror
set title "Call stack of ${command}"
set key off
set border 3
set xtics out 5
set ytics out 5
set mxtics 5
set mytics 5
set xrange [0:${buffer.length}]
	set yrange [0:${maxDepth + 1}]
plot $data using 1:2 w steps lc rgb "red", \
    $data using (0.5+$1):2:3 w labels offset char 0, 0.5
`;

exec(`mkdir -p ${outputDirectory} && echo '${gnuplotCommands.replace('\n', '\\\n')}' | gnuplot`, (error, stdout, stderr) => {
	if (error) {
		console.log(error, stderr.toString());
	} else {
		process.stdout.write(`${outputPath}\n`);
	}
});
