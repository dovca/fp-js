## What is this package about?

The goal of this package is to provide a set of functions whose combinations can be used to write any synchronous JS logic. These functions are written without any keywords, strings, numbers or array literals using as few JS operators as possible.

## What does it contain?

This package provides 28 single-letter-named functions:

### `$` - Wrap
This function has two signatures and behaviors:

* `$(A)`
 
    If called with only one argument , `$(A)` returns a function that returns the value `A`.

* `$(F, ...A)`

	If called with more than one argument, `$(F, ...A)` returns a function that returns the value of arguments `...A` passed through function `F`, that is `F(...A)`.

Examples:
```js
$() // -> () => undefined
$(42) // -> () => 42
$((A, B) => A.concat(B), 'foo', 'bar') // -> () => 'foo'.concat('bar') 
```
### `_` - Identity
`_(A)` returns whatever was passed into it, that means `_(A) === A`.

Examples:
```js
_() // -> undefined
_(42) // -> 42

const a = {foo: 'bar'};
_(a) // -> {foo: 'bar'} which is strictly equal to `a`
```

### `a` - Add
`a(A, B)` returns the sum of its arguments, that is `a(A, B) === A + B`. If argument `A` is omitted, it defaults to 0. If argument `B` is omitted, it defaults to 1.

Examples:
```js
a() // -> 1
a(42) // -> 43
a(2, 3) // -> 5
a(10, -1) // -> 9
```
### `b` - Compare bigger
`b(A, B)` returns `true` if `A` is bigger `B`, `false` otherwise. If argument `B` is omitted, it defaults to 0. 

Examples:
```js
b() // -> false (undefined is not bigger than 0)
b(0) // -> false
b(-5) // -> false
b(42) // -> true
b(1, 2) // -> false
b(2, 1) // -> true
```
### `c` - Count
`c(A)` returns:
* The number of items in array `A` before the first undefined item or empty index if `A` is an array
* The number of characters in string `A` if `A` is a string

Examples:
```js
c([]) // -> 0
c(['foo', 'bar']) // -> 2
c([, , 42]) // -> 0
c([1, 1, , , 3, 3]) // -> 2
c('') // -> 0
c('foobar') // -> 6
```

### `d` - Double
`d(A)` returns the value of `A` multiplied by 2. If argument `A` is omitted, it defaults to 1.

Examples:
```js
d() // -> 2
d(42) // -> 84
d(-10) // -> -20
```

### `e` - Compare equal
`e(A, B)` returns `true` _iff_ `A` is strictly equal to `B`, that is `A === B`. See this [MDN page](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators# Identity) for details.

Examples:
```js
e() // -> true (both arguments are undefined, thus equal to each other)
e(1, 1) // -> true
e(1, '1') // -> false
e({foo: 'bar'}, {foo: 'bar'}) // -> false (actually different objects that just look the same)
```
### `f` - Transform
`f(F, ...A)` returns an array of arguments `...A` passed through function `F` each individually.

Examples:
```js
f(d, 1, 2, 3) // -> [2, 4, 6] (using function `d` from this package)
f(b, -4, 1, -10, 42) // -> [false, true, false, true] (using function `b` from this package)
```

### `g` - Compose
`g(...F)` returns a composition of functions `...F`, that means `g(A, B, C)` returns ` (X) => A(B(C(X)))`.

Examples:
```js
g(d, a, d, a)(9) // -> 42 (equals to (((9+1)*2)+1)*2 using functions `a` and `d` from this package)
g((A) => A.shift(), (A) => A.reverse(), (A) => A.split(''))('foobar') // -> 'r'
```

### `h` - Switch
`h(...C)` behaves similarly to the native `switch` statement. Each argument must be an array of two functions `[E, B]`, where `E` is the _case expression_ and `B` is the _case body_. A case expression must return a [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) value in order for its case body to be executed. Only one and the first of all case bodies is executed. After doing so, any further case expressions are left unevaluated and the function `h` returns. The value returned from `h()` is the return value of the executed case body or `undefined` if no case body has been executed.

Examples:
```js
const value = 42;
h(
	[() => value < 0, () => 'negative'],
	[() => value > 0, () => 'positive'],
	[() => true, () => 'zero'], //default case
) // -> 'positive'
```

### `i` - If/else
 `i(C, T, F)` behaves like the native if/else statement. It calls function `T` if the call `C()` returns a [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) value. If not, function `F` is called instead. The call to function `i` returns whatever `T()` or `F()` returns. If argument `F` is omitted, it defaults to a function that returns `undefined`.
 
 Examples:
 ```js
i(() => true, () => 'foo', () => 'bar') // -> 'foo'
 
const password = 'foobar';
i(() => password.length > 8, () => 'Good.', () => 'Too short.') // -> 'Too short.'

i(() => 69 < 42, () => 420) // -> undefined (no false branch supplied)
```

### `j` - Create object
`o(...P)` constructs an object from key-value pairs defined by arguments `...P`. Each argument must be an array `[K, V]` where `K` is a valid object key name and `V` is the value to be saved under key `K`. If no arguments are given, the call `j()` returns an empty object.

Examples:
```js
j() // -> {}
j(['foo', 'bar']) // -> {foo: 'bar'}
j([1, 2], ['a-b-c', [1, 2, 3]]) // -> {1: 2, 'a-b-c': [1, 2, 3]}
```

### `k` - If/else not empty
`k(A, T, F)` is a specialized version of the [function i](#i---ifelse) from this package. It calls `T` or `F` if the array or string `A` is (non-)empty respectively. 

**Warning:** Due to the very limited resources used in this package, `k([undefined], () => true, () => false)` unexpectedly returns `false` even if the array is obviously not empty.

Examples:
```js
k([], () => 'foo', () => 'bar') // -> 'bar'
k([10, 20, 30], () => true, () => false) // -> true
k('', () => 'bar', () => 'baz') // -> 'baz'
k('hello world', () => 'hello', () => 'world') // -> 'hello'
```

### `l` - Compare less
`l(A, B)` returns `true` if `A` is smaller than `B`, `false` otherwise. If argument `B` is omitted, it defaults to 0. 

Examples:
```js
l() // -> false (undefined is not smaller than 0)
l(0) // -> false
l(-5) // -> true
l(42) // -> false
l(1, 2) // -> true
l(2, 1) // -> false
```

### `m` - Member
`m(A, B)` returns property `A` of object `B`. `B` can be either an array, string or object and `A` must be a valid property name for the respective data type.

Examples:
```js
m(0, [10, 20, 30]) // -> 10
m(3, 'foobar') // -> 'b'
m('foo', {foo: 'bar'}) // -> 'bar'
```

### `n` - Logical NOR
`n(A, B)` returns `A` NOR `B`. If argument `B` is omitted, it defaults to `A`, causing the function to behave like a logical negation.

Examples:
```js
n() // -> true (negation of undefined)
n(true) // -> false
n(true, false) // -> false
n(false, false) // -> true
```

### `o` - Logical OR
`o(A, B)` returns `A` OR `B`. If argument `B` is omitted, it defaults to A, causing the function to work as a converter to boolean.

Examples:
```js
o() // -> false (undefined converted to boolean)
o(42) // -> true
o(true, false) // -> true
o(false, false) // -> false
```

### `p` - Pipe
`p(...F)` returns a composition of functions `...F` in reversed order, that means `p(A, B, C)` returns ` (X) => C(B(A(X)))`.

Examples:
```js
p(d, a, d, a)(9) // -> 39 (equals to (((9*2)+1)*2)+1 using functions `a` and `d` from this package)
p((A) => A.split(''), (A) => A.reverse(), (A) => A.shift())('foobar') // -> 'r'
```

* `q` - Dequeue 
* `r` - Curry
* `s` - Subtract
* `t` - Concatenate
* `u` - Reduce
* `v` - Reverse
* `w` - While
* `x` - Extract
* `y` - Create array
* `z` - Zero
