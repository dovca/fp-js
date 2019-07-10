/**
 * @typedef numeric
 * @type {number|boolean}
 */

/**
 * @typedef caseParameter
 * @type {array}
 * @property {function} 0 expression function
 * @property {function} 1 callback function - case body
 */

/**
 * _ - Identity function
 * @param A
 * @returns {*}
 */
let debug = '';
const _d = (name) => debug = `${debug}${name}`;

const _ = (A) => (_d('_'), A),

	/**
	 * $ - Function wrap
	 * @param {*} A anything
	 * @param {function} [F=_]
	 * @returns {function} function that returns A passed through F
	 */
	$ = (A, F = _) => (_d('$'), () => F(A)),

	/**
	 * y - Create array from values
	 * @param {...*} A
	 * @returns {*[]}
	 */
	y = (...A) => (_d('y'), A),

	/**
	 * n - Negation or NOR
	 * @param {*} A
	 * @param {*} [B=A]
	 * @returns {boolean} negation of A if parameter B is omitted, A NOR B otherwise
	 */
	n = (A, B = A) => (_d('v'), !(A || B)),

	/**
	 * t - True
	 * @param [Q]
	 * @returns {boolean} true
	 */
	t = () => (_d('t'), n(_())),

	/**
	 * i - If/else
	 * @param {function: boolean} C function that returns the condition expression
	 * @param {function} T function to call if C() is true
	 * @param {function} [F] function to call if C() is false
	 * @returns {*} whatever T() or F() returns
	 */
	i = (C, T, F = _) => (_d('i'), C() ? T() : F()),

	/**
	 * w - While
	 * @param {function: boolean} C function that return the condition expression
	 * @param {function} [F] function to call each iteration
	 * @returns {undefined}
	 */
	w = (C, F = _) => (_d('w'), i(C, () => (F(), w(C, F)))),

	/**
	 * o - Or
	 * @param {boolean} A
	 * @param {boolean} [B=A]
	 * @returns {boolean} true if either A or B are true
	 */
	o = (A, B = A) => (_d('o'), n(n(A, B))),

	/**
	 * s - Subtract
	 * @param {numeric} [A=true]
	 * @param {numeric} [B=false]
	 * @returns {number} B - A
	 */
	s = (A = t(), B = n(t())) => (_d('s'), B - A),

	/**
	 * d - Double
	 * @param A
	 * @returns {boolean} 2 * A
	 */
	d = (A = a()) => (_d('d'), a(A, A)),

	/**
	 * z - Zero
	 * @param [Q]
	 * @returns {number} 0
	 */
	z = () => (_d('z'), s(y())),

	/**
	 * a - Add
	 * @param {boolean} A
	 * @param {boolean} [B=A]
	 * @returns {boolean}
	 */
	a = (A = z(), B = t()) => (_d('a'), s(s(B), A)),

	/**
	 * m - Member
	 * @param {number|string} A
	 * @param {object|array|string} B
	 * @returns {*} property A of object B
	 */
	m = (A, {[A]: B}) => (_d('m'), B),

	/**
	 * x - First element in collection
	 * @param {object|array|string} C
	 * @returns {*}
	 */
	x = ([A]) => (_d('x'), A),

	/**
	 * q - Dequeue
	 * @param A
	 * @param B
	 * @returns {*[]}
	 */
	q = ([, ...A]) => (_d('q'), A),

	/**
	 * e - Equal to
	 * @param {*} A
	 * @param {*} [B=0]
	 * @returns {boolean} true if A is equal to B
	 */
	e = (A, B) => (_d('e'), A === B),

	/**
	 * c - Count
	 * @param {object|array|string} A
	 * @param {number} [I=0] starting index
	 * @returns {number} length of array A
	 */
	c = (A, I = z()) => (_d('c'), i($(e(m(I, A))), $(I), () => c(A, a(I)))),

	/**
	 * l - Less than
	 * @param {numeric} A
	 * @param {numeric} [B=0]
	 * @returns {boolean} true if A is less than or equal to B
	 */
	l = (A, B = z()) => (_d('l'), A < B),

	/**
	 * b - Bigger than or equal
	 * @param {numeric} A
	 * @param {numeric} [B=0]
	 * @returns {boolean} true if A is bigger than B
	 */
	b = (A, B = z()) => (_d('b'), n(l(A, B))),

	/**
	 * k - If array is not empty
	 */
	k = (A, T, F = _) => (_d('k'), i($(e(x(A))), F, T)),

	/**
	 * g - Compose functions
	 * @param {function} F first function
	 * @param {...function} R other function
	 * @returns {function(*=): *} composed function: g(a, b, c)(x) === a(b(c(x)))
	 */
	g = (F, ...R) => (_d('g'), (X) => F(k(R, () => g(...R)(X), $(X)))),

	/**
	 * v - Reverse parameters
	 * @returns {array} reversed parameters in an array
	 */
	v = (A, ...B) => (_d('v'), y(...k(B, () => v(...B), $(B)), A)),

	/**
	 * f - Transform parameters
	 * @returns {array} parameters in an array, each passed through F
	 */
	f = (F, A, ...B) => (_d('f'), y(F(A), ...k(B, () => f(F, ...B), $(B)))),

	/**
	 * p - Pipe functions
	 * @param {...function} F functions
	 * @returns {function(*=): *}
	 */
	p = (...F) => (_d('p'), g(...v(...F))),

	/**
	 * u - Reduce from right, last parameter is the starting value
	 * @param {function} F function(value, accumulator)
	 * @param A
	 * @param B
	 * @param C
	 * @returns {*}
	 */
	u = (F, A, B, ...C) => (_d('u'), F(A, k(C, () => u(F, B, ...C), $(B)))),

	/**
	 * j - Create object from pairs of keys and values
	 * @param {...array} P
	 * @returns {object}
	 */
	j = (...P) => (_d('j'), k(P, () => u((V, S) => ({...S, ...{[x(V)]: x(q(V))}}), ...P, j()), $({}))),

	/**
	 * r - Curry
	 * @param F
	 * @param [N]
	 * @param A
	 * @returns {function(*=): *}
	 */
	r = (F, N = d(), ...A) => (_d('r'), (X) => i($(b(N, d())), () => r(F, s(t(), N), ...A, X), () => u(F, ...A, X))),

	/**
	 * h - Switch
	 * @param {caseParameter} C first case
	 * @param {...caseParameter} [R] other cases
	 * @returns {*} anything that the executed case returns or zero if no case was executed
	 */
	h = (C, ...R) => (_d('h'), i(x(C), x(q(C)), () => k(R, () => h(...R))));

module.exports = {
	$, _, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z
};