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
 * _ - Identity
 * @param A
 * @returns {*}
 */
_ = (A) => A;

/**
 * y - Create array
 * @param {...*}A
 * @returns {*[]}
 */
y = (...A) => A;

/**
 * m - Member
 * @param {number|string} A property name
 * @param {object|array|string} unnamed object to get property from
 * @returns {*} property A of object: obj[A]
 */
m = (A, {[A]: B}) => B;

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
 * x - Extract
 * @param {array|string} C
 * @returns {*} the first element or character of C
 */
x = ([A]) => A;

/**
 * t - Concatenate
 * @param {*[]} A array to push into
 * @param {...*} B values to push
 * @returns {*[]} new modified array
 */
t = (A, ...B) => y(...A, ...B);

/**
 * q - Dequeue
 * @param A (reserved for internal use)
 * @returns {*[]} clone of first parameter with first element removed
 */
q = ([, ...A]) => A;

/**
 * $ - Wrap
 * @param {function|*} F function to use or single value to wrap in a function
 * @param {*} [A] first parameter to F
 * @param {...*} [B] other parameters to F
 * @returns {*} returns F if second argument is undefined, otherwise applies A as arguments to function F
 */
$ = (F, A, ...B) => () => i(() => e(A), () => F, () => F(A, ...B));

/**
 * n - Logical NOR
 * @param {boolean} A
 * @param {boolean} [B=A]
 * @returns {boolean} negation of A if parameter B is omitted, A NOR B otherwise
 */
n = (A, B = A) => !(A || B); //operator ! and ||

/**
 * o - Logical OR
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
 * z - Zero
 * @returns {number} 0
 */
z = (A = O) => s(A, O);

/**
 * i - If/else
 * @param {function: boolean} C function that returns the condition expression
 * @param {function} T function to call if C() is true
 * @param {function} [F=function: undefined] function to call if C() is false
 * @returns {*} whatever T() or F() returns
 */
i = (C, T, F = _) => m(z(o(C())), y(F, T))();

/**
 * w - While
 * @param {function: boolean} C function that returns the condition expression
 * @param {function} F function to call each iteration
 * @returns {undefined} nothing
 */
w = (C, F) => i(C, () => (F(), w(C, F))); //operator ,

/**
 * s - Subtract
 * @param {numeric} [A=true] value to subtract
 * @param {numeric} [B=false] value to subtract from
 * @returns {number} B - A
 */
s = (A = O, B = E) => A - B; //operator -

/**
 * a - Add
 * @param {numeric} [A=false] value to add to
 * @param {numeric} [B=true] value to add
 * @returns {number} A + B
 */
a = (A = O, B = E) => s(A, s(O, B));

/**
 * d - Double
 * @param {numeric} [A=true] number to double
 * @returns {number} 2 * A
 */
d = (A = E) => a(A, A);

/**
 * c - Count
 * @param {*} A first element
 * @param {...*} B other elements
 * @param {numeric} [I=0] starting index
 * @returns {number} length of array A
 */
c = ([A, ...B], I = z()) => i($(e, A), $(I), $(c, B, a(I)));

/**
 * l - Compare less
 * @param {numeric} A first value
 * @param {numeric} [B=false] second value
 * @returns {boolean} true if A is less than or equal to B, false otherwise
 */
l = (A, B = O) => A < B; //operator <

/**
 * b - Compare bigger
 * @param {numeric} A first value
 * @param {numeric} [B=false] second value
 * @returns {boolean} true if A is bigger than B, false otherwise
 */
b = (A, B = O) => l(B, A);

/**
 * k - If/else not empty
 * @param {*[]|string} A array or string
 * @param {function(): *} T function to execute if A is not empty
 * @param {function(): *} [F=function(): undefined] function to execute if A is empty
 * @returns {*} whatever T() or F() returns
 */
k = (A, T, F = _) => i($(e, x(A)), F, T);

/**
 * g - Compose
 * @param {function} F first function
 * @param {...function} [R] other functions
 * @returns {function(*=): *} composed function: g(a, b, c)(x) === a(b(c(x)))
 */
g = (F, ...R) => (X) => F(k(R, () => g(...R)(X), $(X)));

/**
 * v - Reverse
 * @param {*} A first parameter
 * @param {...*} B other parameters
 * @returns {*[]} reversed parameters in an array
 */
v = (A, ...B) => y(...k(B, $(v, ...B), $(B)), A);

/**
 * f - Transform
 * @param {function(*=): *} F transformer function
 * @param {*} A first element
 * @param {*} B other elements
 * @returns {*[]} elements in an array, each passed through F
 */
f = (F, A, ...B) => y(F(A), ...k(B, $(f, F, ...B), $(B)));

/**
 * p - Pipe
 * @param {...function(*=): *} F functions
 * @returns {function(*=): *}
 */
p = (...F) => g(...v(...F));

/**
 * u - Reduce
 * @param {function(*,*): *} F function(value, accumulator)
 * @param {*} A (no special meaning)
 * @param {*} B (no special meaning)
 * @param {...*} C (no special meaning)
 * @returns {*} the reduced value
 */
u = (F, A, B, ...C) => F(A, k(C, $(u, F, B, ...C), $(B)));

/**
 * j - Create object
 * @param {...keyValuePair} P
 * @returns {object}
 */
j = (...P) => k(P, $(u, ([K, V], S) => ({...S, [K]: V}), ...P, j), $({}));

/**
 * r - Curry
 * @param {function: *} F curried function
 * @param {numeric} [N=2] depth of currying
 * @param {...*} A (reserved for internal use)
 * @returns {function(*=): *}
 */
r = (F, N = d(), ...A) => (X) => i($(l, N, d()), $(F, ...A, X), $(r, F, s(N), ...A, X));

/**
 * h - Switch
 * @param {function(): boolean} C case expression function
 * @param {function(): *} B case body function
 * @param {...caseParameter} [R] other cases
 * @returns {*} anything that the executed case returns or undefined if no case was executed
 */
h = (C, ...R) => i(...C, $(k, R, $(h, ...R)));


module.exports = {
	$, _, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z
};