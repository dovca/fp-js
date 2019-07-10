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
const _ = (A) => A,

	/**
	 * $ - Function wrap
	 * @param {*} A anything
	 * @param {function} [F=_]
	 * @returns {function} function that returns A passed through F
	 */
	$ = (A, F = _) => () => F(A),

	/**
	 * y - Create array from values
	 * @param {...*} A
	 * @returns {*[]}
	 */
	y = (...A) => A,

	/**
	 * n - Negation or NOR
	 * @param {*} A
	 * @param {*} [B=A]
	 * @returns {boolean} negation of A if parameter B is omitted, A NOR B otherwise
	 */
	n = (A, B = A) => !(A || B),

	/**
	 * t - True
	 * @returns {boolean} true
	 */
	t = () => n(_()),

	/**
	 * i - If/else
	 * @param {function: boolean} C function that returns the condition expression
	 * @param {function} T function to call if C() is true
	 * @param {function} [F=function: undefined] function to call if C() is false
	 * @returns {*} whatever T() or F() returns
	 */
	i = (C, T, F = _) => C() ? T() : F(),

	/**
	 * w - While
	 * @param {function: boolean} C function that returns the condition expression
	 * @param {function} F function to call each iteration
	 * @returns {undefined}
	 */
	w = (C, F) => i(C, () => (F(), w(C, F))),

	/**
	 * o - Or
	 * @param {boolean} A
	 * @param {boolean} [B=A]
	 * @returns {boolean} true if either A or B are true
	 */
	o = (A, B = A) => n(n(A, B)),

	/**
	 * s - Subtract
	 * @param {numeric} [A=true]
	 * @param {numeric} [B=false]
	 * @returns {number} B - A
	 */
	s = (A = t(), B = n(t())) => B - A,

	/**
	 * z - Zero
	 * @returns {number} 0
	 */
	z = () => s(y()),

	/**
	 * a - Add
	 * @param {numeric} [A=0]
	 * @param {numeric} [B=true]
	 * @returns {number}
	 */
	a = (A = z(), B = t()) => s(s(B), A),

	/**
	 * d - Double
	 * @param {numeric} [A=1]
	 * @returns {number} 2 * A
	 */
	d = (A = a()) => a(A, A),

	/**
	 * m - Member
	 * @param {number|string} A
	 * @param {object|array|string} B
	 * @returns {*} property A of object B
	 */
	m = (A, {[A]: B}) => B,

	/**
	 * x - First element in collection
	 * @param {object|array|string} C
	 * @returns {*}
	 */
	x = ([A]) => A,

	/**
	 * q - Dequeue
	 * @param A
	 * @returns {*[]}
	 */
	q = ([, ...A]) => A,

	/**
	 * e - Equal to
	 * @param A
	 * @param [B]
	 * @returns {boolean} true if A is strictly equal to B, false otherwise
	 */
	e = (A, B) => A === B,

	/**
	 * c - Count
	 * @param {object|array|string} A
	 * @param {number} [I=0] starting index
	 * @returns {number} length of array A
	 */
	c = (A, I = z()) => i($(e(m(I, A))), $(I), () => c(A, a(I))),

	/**
	 * l - Less than
	 * @param {numeric} A
	 * @param {numeric} [B=0]
	 * @returns {boolean} true if A is less than or equal to B, false otherwise
	 */
	l = (A, B = z()) => A < B,

	/**
	 * b - Bigger than or equal
	 * @param {numeric} A
	 * @param {numeric} [B=0]
	 * @returns {boolean} true if A is bigger than B, false otherwise
	 */
	b = (A, B = z()) => n(l(A, B)),

	/**
	 * k - If array is not empty
	 * @param {array} A
	 * @param {function} T
	 * @param {function} [F=function: undefined]
	 * @returns {*} whatever T() or F() returns
	 */
	k = (A, T, F = _) => i($(e(x(A))), F, T),

	/**
	 * g - Compose functions
	 * @param {function} F first function
	 * @param {...function} R other function
	 * @returns {function} composed function: g(a, b, c)(x) === a(b(c(x)))
	 */
	g = (F, ...R) => (X) => F(k(R, () => g(...R)(X), $(X))),

	/**
	 * v - Reverse parameters
	 * @returns {array} reversed parameters in an array
	 */
	v = (A, ...B) => y(...k(B, () => v(...B), $(B)), A),

	/**
	 * f - Transform elements
	 *
	 * @param {function} F transformer function
	 * @param A first element
	 * @param B other elements
	 * @returns {array} elements in an array, each passed through F
	 */
	f = (F, A, ...B) => y(F(A), ...k(B, () => f(F, ...B), $(B))),

	/**
	 * p - Pipe functions
	 * @param {...function} F functions
	 * @returns {function}
	 */
	p = (...F) => g(...v(...F)),

	/**
	 * u - Reduce from right, last parameter is the starting value
	 * @param {function} F function(value, accumulator)
	 * @param A
	 * @param B
	 * @param C
	 * @returns {*}
	 */
	u = (F, A, B, ...C) => F(A, k(C, () => u(F, B, ...C), $(B))),

	/**
	 * j - Create object from pairs of keys and values
	 * @param {...array} P
	 * @returns {object}
	 */
	j = (...P) => k(P, () => u((V, S) => ({...S, ...{[x(V)]: x(q(V))}}), ...P, j()), $({})),

	/**
	 * r - Curry
	 * @param {function} F curried function
	 * @param [N=2] depth of currying
	 * @param A
	 * @returns {function(*=): *}
	 */
	r = (F, N = d(), ...A) => (X) => i($(b(N, d())), () => r(F, s(t(), N), ...A, X), () => u(F, ...A, X)),

	/**
	 * h - Switch
	 * @param {caseParameter} C first case
	 * @param {...caseParameter} [R] other cases
	 * @returns {*} anything that the executed case returns or zero if no case was executed
	 */
	h = (C, ...R) => i(x(C), x(q(C)), () => k(R, () => h(...R)));

module.exports = {
	$, _, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z
};