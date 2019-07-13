const debug = require(`${__dirname}/../util/debug`);

/**
 * @typedef numeric
 * @type {number|boolean}
 */

/**
 * @typedef caseParameter
 * @type {array}
 * @property {function(): boolean} 0 expression function
 * @property {function(): *} 1 callback function - case body
 */

/**
 * @typedef keyValuePair
 * @type {array}
 * @property 0 key
 * @property 1 value
 */

/**
 * _ - Identity function
 * @param A
 * @returns {*}
 */
_ = (A) => A;

/**
 * y - Create array from values
 * @param {...*}A
 * @returns {*[]}
 */
y = (...A) => A;

/**
 * i - If/else
 * @param {function: boolean} C function that returns the condition expression
 * @param {function} T function to call if C() is true
 * @param {function} [F=function: undefined] function to call if C() is false
 * @returns {*} whatever T() or F() returns
 */
i = (C, T, F = _) => C() ? T() : F();

/**
 * e - Equal to
 * @param {*} [A] first value
 * @param {*} [B] second value
 * @returns {boolean} true if A is strictly equal to B, false otherwise
 */
e = (A, B) => A === B;

/**
 * Cached value of true
 * @type {boolean}
 */
E = e();

/**
 * x - First element in collection
 * @param {array|string} C
 * @returns {*} the first element or character of C
 */
x = ([A]) => A;

/**
 * t - Concat
 * @param {*[]} A array to push into
 * @param {...*} B values to push
 * @returns {*[]} new modified array
 */
t = (A, ...B) => [...A, ...B];

/**
 * q - Dequeue
 * @param A (reserved for internal use)
 * @returns {*[]} clone of first parameter with first element removed
 */
q = ([, ...A]) => A;

/**
 * $ - Function wrap
 * @param {function|*} F function to use or single value to wrap in a function
 * @param {*} [A] first parameter to F
 * @param {...*} [B] other parameters to F
 * @returns {*} returns F if second argument is undefined, otherwise applies A as arguments to function F
 */
$ = (F, A, ...B) => () => i(() => e(A), () => F, () => F(A, ...B));

/**
 * n - Negation or NOR
 * @param {boolean} A
 * @param {boolean} [B=A]
 * @returns {boolean} negation of A if parameter B is omitted, A NOR B otherwise
 */
n = (A, B = A) => !(A | B);

/**
 * w - While
 * @param {function: boolean} C function that returns the condition expression
 * @param {function} F function to call each iteration
 * @returns {undefined} nothing
 */
w = (C, F) => i(C, () => (F(), w(C, F)));

/**
 * o - Logical OR or boolean conversion
 * @param {boolean} [A] first value
 * @param {boolean} [B=A] second value
 * @returns {boolean} A converted to boolean if B is omitted, A OR B otherwise
 */
o = (A, B = A) => n(n(A, B));

/**
 * Cached value of false
 * @type {boolean}
 */
O = o();

/**
 * s - Subtract
 * @param {numeric} [A=true] value to subtract
 * @param {numeric} [B=false] value to subtract from
 * @returns {number} B - A
 */
s = (A = E, B = O) => B - A;

/**
 * z - Zero
 * @returns {number} 0
 */
z = $(s, O);

/**
 * a - Add
 * @param {numeric} [A=false] value to add to
 * @param {numeric} [B=true] value to add
 * @returns {number} A + B
 */
a = (A = O, B = E) => s(s(B), A);

/**
 * d - Double
 * @param {numeric} [A=true] number to double
 * @returns {number} 2 * A
 */
d = (A = E) => a(A, A);

/**
 * m - Member
 * @param {number|string} A property name
 * @param {object|array|string} unnamed object to get property from
 * @returns {*} property A of object: obj[A]
 */
m = (A, {[A]: B}) => B;

/**
 * c - Count
 * @param {*} A first element
 * @param {...*} B other elements
 * @param {numeric} [I=0] starting index
 * @returns {number} length of array A
 */
c = ([A, ...B], I = z()) => i($(e, A), $(I), $(c, B, a(I)));

/**
 * l - Less than
 * @param {numeric} A first value
 * @param {numeric} [B=false] second value
 * @returns {boolean} true if A is less than or equal to B, false otherwise
 */
l = (A, B = O) => A < B;

/**
 * b - Bigger than
 * @param {numeric} A first value
 * @param {numeric} [B=false] second value
 * @returns {boolean} true if A is bigger than B, false otherwise
 */
b = (A, B = O) => l(B, A);

/**
 * k - If array is not empty
 * @param {*[]} A array
 * @param {function(): *} T function to execute if A is not empty
 * @param {function(): *} [F=function(): undefined] function to execute if A is empty
 * @returns {*} whatever T() or F() returns
 */
k = (A, T, F = _) => i($(e, x(A)), F, T);

/**
 * g - Compose functions
 * @param {function} F first function
 * @param {...function} [R] other functions
 * @returns {function(*=): *} composed function: g(a, b, c)(x) === a(b(c(x)))
 */
g = (F, ...R) => (X) => F(k(R, () => g(...R)(X), $(X)));

/**
 * v - Reverse parameters
 * @param {*} A first parameter
 * @param {...*} B other parameters
 * @returns {*[]} reversed parameters in an array
 */
v = (A, ...B) => y(...k(B, $(v, ...B), $(B)), A);

/**
 * f - Transform elements
 *
 * @param {function(*=): *} F transformer function
 * @param {*} A first element
 * @param {*} B other elements
 * @returns {*[]} elements in an array, each passed through F
 */
f = (F, A, ...B) => y(F(A), ...k(B, $(f, F, ...B), $(B)));

/**
 * p - Pipe functions
 * @param {...function(*=): *} F functions
 * @returns {function(*=): *}
 */
p = (...F) => g(...v(...F));

/**
 * u - Reduce from right, last parameter is the starting value
 * @param {function(*,*): *} F function(value, accumulator)
 * @param {*} A (no special meaning)
 * @param {*} B (no special meaning)
 * @param {...*} C (no special meaning)
 * @returns {*} the reduced value
 */
u = (F, A, B, ...C) => F(A, k(C, $(u, F, B, ...C), $(B)));

/**
 * j - Create object from pairs of keys and values
 * @param {...keyValuePair} P
 * @returns {object}
 */
j = (...P) => k(P, $(u, ([K, V], S) => ({...S, [K]: V}), ...P, j), $({}));

/**
 * r - Curry
 * @param {function(*=): *} F curried function
 * @param {numeric} [N=2] depth of currying
 * @param {...*} A (reserved for internal use)
 * @returns {function(*=): *}
 */
r = (F, N = d(), ...A) => (X) => i($(l, N, d()), $(u, F, ...A, X), $(r, F, s(E, N), ...A, X));

/**
 * h - Switch
 * @param {function(): boolean} C case expression function
 * @param {function(): *} B case body function
 * @param {...caseParameter} [R] other cases
 * @returns {*} anything that the executed case returns or undefined if no case was executed
 */
h = (C, ...R) => i(...C, $(k, R, $(h, ...R)));


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