const debug = require(`${__dirname}/../util/debug`);

//@include ../partials/definitions.js

$ = debug.wrap($, '$');
_ = debug.wrap(_, '_');
a = debug.wrap(a, 'a');
b = debug.wrap(b, 'b');
c = debug.wrap(c, 'c');
d = debug.wrap(d, 'd');
e = debug.wrap(e, 'e');
f = debug.wrap(f, 'f');
g = debug.wrap(g, 'g');
h = debug.wrap(h, 'h');
i = debug.wrap(i, 'i');
j = debug.wrap(j, 'j');
k = debug.wrap(k, 'k');
l = debug.wrap(l, 'l');
m = debug.wrap(m, 'm');
n = debug.wrap(n, 'n');
o = debug.wrap(o, 'o');
p = debug.wrap(p, 'p');
q = debug.wrap(q, 'q');
r = debug.wrap(r, 'r');
s = debug.wrap(s, 's');
t = debug.wrap(t, 't');
u = debug.wrap(u, 'u');
v = debug.wrap(v, 'v');
w = debug.wrap(w, 'w');
x = debug.wrap(x, 'x');
y = debug.wrap(y, 'y');
z = debug.wrap(z, 'z');

module.exports = {
	$, _, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, ...debug
};