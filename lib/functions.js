/**
 * @typedef {*} thing
 */

/**
 * @typedef numeric
 * @type {number|boolean|null}
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
 * _ - Identity
 * @param {*} X anything
 * @returns {*} the same thing
 */
_ = (X) => X;

/**
 * y - Create array
 * @param {...*} V values to put into the array
 * @returns {*[]}
 */
y = (...V) => V;

/**
 * Cached empty array
 * @type {array}
 */
Y = y();

/**
 * x - Extract
 * @param {number|string} P property name
 * @param {object|array|string} S object to get property from
 * @returns {*} property A of object: obj[A]
 */
x = (P, {[P]: V}) => V;

/**
 * q - Dequeue
 * @param {thing[]|string} A array or string
 * @returns {thing[]|string[]} array filled with elements of A except the first one
 */
q = ([, ...V]) => V;

/**
 * e - Compare equal
 * @param {*} [A] first value
 * @param {*} [B] second value
 * @returns {boolean} true if A is strictly equal to B, false otherwise
 */
e = (A, B) => A === B; //operator ===

/**
 * Cached value of true
 * @type {boolean}
 */
E = e();

/**
 * a - Add
 * @param {numeric} [A=false] value to add to
 * @param {numeric} [B=true] value to add
 * @returns {number} A + B
 */
a = (A = L, B = E) => A + B; //operator +

/**
 * l - Compare less
 * @param {numeric} [A] first value
 * @param {numeric} [B=[]] second value
 * @returns {boolean} true if A is less than or equal to B, false otherwise
 */
l = (A, B = Y) => A < B; //operator <

/**
 * Cached value of false
 * @type {boolean}
 */
L = l();

/**
 * b - Subtract
 * @param {numeric} [A=false] value to subtract from
 * @param {numeric} [B=true] value to subtract
 * @returns {number} A - B
 */
b = (A = L, B = E) => a(A, a(~B, E)); //operator ~

/**
 * $ - Wrap
 * @param {(function(*=): *)|thing} [F] function to use or single value to wrap in a function
 * @param {*} [A] first parameter to F
 * @param {...*} [B] other parameters to F
 * @returns {*|(function(): thing)} returns F if second argument is undefined, otherwise applies A as arguments to function F
 */
$ = (F, A, ...B) => () => i(() => e(A), () => F, () => F(A, ...B));

/**
 * z - Zero
 * @param {numeric} [A=false] value to convert to number
 * @returns {number} A converted to number
 */
z = (A = L) => a(A, L);

/**
 * Cached value of 0
 * @type {number}
 */
Z = z();

/**
 * d - Double
 * @param {numeric} [A=true] number to double
 * @returns {number} 2 * A
 */
d = (A = E) => a(A, A);

/**
 * n - Logical negation
 * @param {boolean} [A]
 * @returns {boolean} negation of A
 */
n = (A) => e(z(A), Z);

/**
 * o - Logical OR
 * @param {boolean} [A] first value
 * @param {boolean} [B=A] second value
 * @returns {boolean} A converted to boolean if B is omitted, A OR B otherwise
 */
o = (A, B = A) => l(L, a(n(n(A)), n(n(B))));

/**
 * i - If/else
 * @param {function(): boolean} C function that returns the condition expression
 * @param {function(): *} T function to call if C() is true
 * @param {function(): *} [F=function: undefined] function to call if C() is false
 * @returns {*} whatever T() or F() returns
 */
i = (C, T, F = _) => x(z(o(C())), y(F, T))();

/**
 * w - While
 * @param {function(): boolean} C function that returns the condition expression
 * @param {function(): *} F function to call each iteration
 * @param {*} [R] (internal use) expression to return at the end
 * @returns {*} whatever the last call to F returned or undefined
 */
w = (C, F, R) => i(C, () => w(C, F, F()), $(R));

/**
 * c - Count
 * @param {*} A first element
 * @param {...*} [B] other elements
 * @param {numeric} [I=0] starting index
 * @returns {number} length of array A
 */
c = ([A, ...B], I = Z) => i($(e, A), $(I), $(c, B, a(I)));

/**
 * k - If/else not empty
 * @param {*[]|string} A array or string
 * @param {function(): *} T function to execute if A is not empty
 * @param {function(): *} [F=function(): undefined] function to execute if A is empty
 * @returns {*} whatever T() or F() returns
 */
k = (A, T, F = _) => i($(e, x(Z, A)), F, T);

/**
 * t - Concatenate
 * @param {*[]} A array to push into
 * @param {...*} [B] values to push
 * @returns {*[]} new modified array
 */
t = (A, ...B) => y(...A, ...k(B, $(B), $(Y)));

/**
 * g - Compose
 * @param {function(*=): *} F first function
 * @param {...function(*=): *} [R] other functions
 * @returns {function(*=): *} composed function: g(a, b, c)(x) === a(b(c(x)))
 */
g = (F, ...R) => (X) => F(k(R, () => g(...R)(X), $(X)));

/**
 * v - Reverse
 * @param {thing} [A] first parameter
 * @param {...thing} [B] other parameters
 * @returns {thing[]} reversed parameters in an array
 */
v = (A, ...B) => i($(e, A), $(Y), () => y(...v(...B), A));

/**
 * m - Map
 * @param {function(*=): *} F transformer function
 * @param {*} A first element
 * @param {...*} [B] other elements
 * @returns {*[]} elements in an array, each passed through F
 */
m = (F, A, ...B) => y(F(A), ...k(B, $(m, F, ...B), $(B)));

/**
 * p - Pipe
 * @param {...function(*=): *} F functions
 * @returns {function(*=): *}
 */
p = (...F) => g(...v(...F));

/**
 * r - Reduce
 * @param {function(*,*): *} [F] function(value, accumulator)
 * @param {*} [A] first element
 * @param {...*} [B] other elements
 * @returns {*} the reduced value
 */
r = (F, A, ...B) => k(B, $(F, A, k(B, $(r, F, ...B))), $(A));

/**
 * s - String
 * @param {...*} [A] values to concatenate in a string
 * @returns {string} concatenated values
 */
s = (...A) => r(a, ...A, Y, Y);

/**
 * j - Create object
 * @param {...keyValuePair} [P] key-value pairs to add to the returned object
 * @returns {object}
 */
j = (...P) => k(P, $(r, ([K, V], S) => _({...S, [K]: V}), ...P, j), $({}));

/**
 * u - Curry
 * @param {function(*): *} F curried function
 * @param {numeric} [N=2] depth of currying, arity of the function F
 * @param {...*} [A] (internal use) saved argument values
 * @returns {function(*=): *}
 */
u = (F, N = d(), ...A) => (X) => i($(l, N, d()), $(F, ...A, X), $(u, F, b(N), ...A, X));

/**
 * h - Switch
 * @param {caseParameter} C first case
 * @param {...caseParameter} [R] other cases
 * @returns {*} anything that the executed case returns or undefined if no case was executed
 */
h = (C, ...R) => i(...C, $(k, R, $(h, ...R)));

/**
 * f - Filter
 * @param {function(*): boolean} F function that returns true for each value that should be picked
 * @param {...*} A elements
 * @returns {*[]} array with values from A that were picked by F
 */
f = (F, ...A) => r((V, S) => i($(F, V), $(y, V, ...S), $(S)), ...A, Y);


module.exports = {
	$, _, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z
};