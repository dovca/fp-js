((
	//Import FP-JS functions
	{$, _, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z} = require('../lib/functions.js'),
	//Function to get synchronous input
	{question} = require('readline-sync'),
	//Use random numbers
	{random} = Math,
	//Function to print a message
	print = (text) => process.stdout.write(text),
	//Function to multiply a number by 256
	multiplyTwoFiftySix = (X) => g(d, d, d, d, d, d, d, d)(X),
	//The number 256
	twoFiftySix = multiplyTwoFiftySix(),
	//Function to floor a number
	floor = (X) => b(z(), b(z(), X)),
	nextTry = (number, round = a()) => ((
		guess = question('Your guess: ')
	) => i(
		$(e, guess, s(number)), //The guess was correct
		$(print, s('Correct! You got it right on the ', round, '. try!\n')),
		() => (
			print(s('Too ', i($(l, guess, number), $('low'), $('high')), '.\n')),
				nextTry(number, a(round))
		)
	))()
) => (
	print(s('Guess a number ', a(), '-', twoFiftySix, '\n\n')),
		nextTry(a(floor(multiplyTwoFiftySix(random()))))
))();
