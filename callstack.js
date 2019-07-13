const {$, _, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, getDebugBuffer} = require('./dist/functions.debug');
const command = process.argv[2];
eval(command);
let stackDepth = 0;
let maxDepth = stackDepth;
const buffer = getDebugBuffer();
const plotData = [].concat(
	[`0 0`],
	buffer.map((v, i) => {
		const isPop = v === '-';
		stackDepth = stackDepth + (isPop ? -1 : 1);
		maxDepth = Math.max(maxDepth, stackDepth);

		return `${i + 1} ${stackDepth} ${isPop ? '' : v}`;
	}),
	[`${buffer.length + 1} 0`]
);

process.stdout.write(`
$data << EOD
${plotData.join('\n')}
EOD

set terminal svg enhanced background rgb 'white' size ${Math.min(8000, (buffer.length + 1) * 10 + 80)}, ${Math.min((maxDepth + 1) * 10 + 100)}
set output "dist/callstack.svg"
set xtics nomirror
set ytics nomirror
set title "Call stack of ${command}"
set key off
set border 3
set xtics out 10
set mxtics 10
set yrange [0:${maxDepth + 1}]
set xrange [0:${buffer.length + 1}]
plot $data using 1:2 w steps lc rgb 'red', \
    $data using (0.5+$1):2:3 w labels offset char 0, 1
`);
