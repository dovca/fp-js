((
	//Import FP-JS functions
	{$, _, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z} = require('../lib/functions'),
	//Function to get synchronous input
	{question} = require('readline-sync'),
	//Use random numbers
	{random} = Math,
	//Function to output a message
	print = (text) => process.stdout.write(text),
	//The number 250
	twoHundredFifty = p(a, d, a, d, a, d, a, d, a, d, d, a, d)(),
	//The number 13
	thirteen = g(a, d, d, a, d, a)(),
	//The number 10
	ten = g(d, a, d, d, a)(),
	//The number 5
	five = g(a, d, d, a)(),
	//Function to get a card rank
	getCardRank = ([rank]) => rank,
	//Function to format a cash amount
	formatCash = (cash) => s('Cash: $', cash, i($(l, cash, a()), $(s()), $(z()))),
	//Array.prorotype.every
	every = (array, fn) => r((V, A) => n(o(n(A), n(fn(V)))), ...array, e()),
	//Array.prototype.some
	some = (array, fn) => r((V, A) => o(A, fn(V)), ...array, l()),
	//Array.protoype.sort (bubblesort)
	sort = (array, fn) => ((
		sort = ([A, B, ...rest]) => i(
			$(e, B),
			$(y, A),
			() => i(
				$(fn, A, B),
				() => y(A, ...sort(y(B, ...rest))),
				() => y(B, ...sort(y(A, ...rest)))
			)
		)
	) => x(z(), w(
		([, I]) => l(z(), I),
		([result, I]) => y(sort(result), b(I)),
		y(array, c(array))
	)))(),
	//Array of all cards
	cards = $(
		(rankValues, rankNames, suits, suitSymbols) => $(
			(zippedValues) => x(z(), w( //Create sets of cards of each suit
				([, I]) => l(I, c(suits)),
				([result, I]) => y(
					t(
						result,
						...m((Z) => t(Z, x(I, suits), x(I, suitSymbols)), ...zippedValues) //Create card structure [rank, name, suit, symbol]
					),
					a(I)
				),
				y(y(), z()) //Start with [[], 0]
			)),
			x(z(), w( //rankValues and rankNames zipped together
				([, I]) => l(I, thirteen),
				([result, I, [V, ...values], [N, ...names]]) => y(t(result, y(V, N)), a(I), values, names),
				y(y(), z(), rankValues, rankNames)
			))
		)(),
		w( //Numbers from 2 to 14
			(X) => l(c(X), thirteen), //While length of array is smaller than 13
			(X) => t(X, a(x(b(c(X)), X))), //Append (X[-1] + 1) to X
			y(d())
		),
		t( //Numbers from 2 to 10 and named ranks
			$(
				(nine) => w(
					(X) => l(c(X), nine),  //While length of array is smaller than 9
					(X) => t(X, a(x(b(c(X)), X))), //Append (X[-1] + 1) to X
					y(d())
				), //Start with X = [2]
				g(a, d, d, d, a)()
			)(),
			'Jack', 'Queen', 'King', 'Ace'
		),
		y('Clubs', 'Diamonds', 'Hearts', 'Spades'),
		y('♣', '♦', '♥', '♠')
	)(),
	//Function to return a new shuffled array
	shuffle = (array) => $(
		(X) => g(X, X, X, X, X)(array),
		(values) => x(z(), w(
			([result]) => l(c(result), c(values)), //While there are still values left to pick
			([result, [head, ...H], [tail, ...T]]) => i(
				() => l(a(), d(random())),
				() => y(t(result, head), H, y(tail, ...T)), //Pick a value from the beginning
				() => y(t(result, tail), y(head, ...H), T) //Pick a value from the end
			),
			y(y(), values, v(...values))
		))
	)(),
	//Function to group array elements by equal properties
	//group([[1], [3], [2], [4], [2], [1], [1]], 0) -> [ [[1],[1],[1]], [[2],[2]], [[4]], [[3]] ]
	group = (array, propFunction) => $(
		(compare) => r( //reduce cards with accumulator A = [] by C:
			(C, A) => i( //if A contains a group with a card equal to C
				() => k(
					A,
					$(some(A, (V) => compare(x(z(), V), C))),
					$(l())
				),
				() => m( //A = map A by G:
					(G) => i( //if G[0] equals C
						$(compare, x(z(), G), C),
						$(t, G, C), //push C to G and return G
						$(G) //return G unchanged
					),
					...A
				),
				$(t, A, y(C)) //push [C] to A
			),
			...array,
			y()
		),
		(A, B) => e(x(propFunction(), A), x(propFunction(), B))
	)(),
	//Function to sort cards by rank
	sortByRank = (C) => sort(C, (A, B) => l(getCardRank(A), getCardRank(B))),
	//Function to get the display name of a card
	getCardDisplayName = ([rank, name, suit, symbol]) => s(
		w( //Get a short name padded to length 2
			(V) => l(c(V), d()),
			(V) => s(' ', V),
			s(i($(l, ten, rank), $(x, z(), name), $(rank))) //If it's not a number, use the first letter
		),
		symbol,
		'\t',
		name,
		' of ',
		suit
	),
	//Function that plays a new game
	getNextRound = ([c0, c1, c2, c3, c4, ...remainingDeckCards], cash, round) => (
		playingCards = y(c0, c1, c2, c3, c4),
		_dummy = print(s('\n', ...x(z(), w( //Print numbered cards
			([, , I]) => l(I, five),
			([result, [C, ...rest], I]) => y(t(result, s(a(I), ': ', getCardDisplayName(C), '\n')), rest, a(I)),
			y([], playingCards, z())
		)), '\n')),
		userCardSelection = question('Which cards do you want to keep? (1-5, space separated) '),
		selectedCardIndices = f((V) => n(e(V, ' ')), ...userCardSelection),
		[discardedCards, selectedCards] = x(z(), w( //Process the user input ant divide five cards into discarded and selected
			([, I]) => l(I, five),
			([[discard, select], I], nextIndex = a(I), currentCard = x(I, playingCards)) => k(
				f((V) => e(V, s(nextIndex)), ...selectedCardIndices), //User input is 1-based, that's why nextIndex is used
				() => y(y(discard, t(select, currentCard)), nextIndex), //Select this card
				() => y(y(t(discard, currentCard), select), nextIndex) //Discard this card
			),
			y(y(y(), y()), z())
		)),
		[refilledCards, deckCards] = x(z(), w( //Refill playing cards from the deck
			([, I]) => l(z(), I),
			([[refilled, deck], I]) => y(y(t(refilled, x(z(), deck)), q(deck)), b(I)),
			y(y(selectedCards, t(remainingDeckCards, ...discardedCards)), c(discardedCards)) //Put the discarded cards back in the deck
		)),
		jacksOrBetter = (hand) => some(
			group(f((C) => l(ten, getCardRank(C)), ...hand), $(z())), //Filter only JQKA and group by rank
			(G) => e(d(), c(G)) //Find a group with two cards
		),
		twoPairs = (hand) => e(d(), c(f((G) => e(d(), c(G)), ...group(hand, $(z()))))),
		threeOfAKind = (hand) => some(group(hand, $(z())), (G) => e(a(d()), c(G))),
		straight = (hand) => $(
			(sortedNormal, sortedAceRankedOne) => some(
				y(sortedNormal, sortedAceRankedOne),
				(C) => n(x(z(), w(
					([, , I]) => l(I, d(d())),
					([result, [A, B, ...rest], I]) => y(
						//Check if the rank difference between neighboring cards is 1
						o(result, n(e(a(), b(getCardRank(B), getCardRank(A))))),
						y(B, ...rest),
						a(I)
					),
					y(l(), C, z())
				)))
			),
			sortByRank(hand),
			sortByRank(m( //Ace can be the lowest card in a straight, make its rank 1
				(V) => i(
					$(e, a(thirteen), getCardRank(V)),
					$(y(a(), ...q(V))),
					$(V)
				),
				...hand
			))
		)(),
		flush = (hand) => e(a(), c(group(hand, $(d())))),
		fullHouse = (hand) => $(
			(groupedByRank) => n(o(
				n(some(groupedByRank, (G) => e(a(d()), c(G)))), //Check for 3 cards of the same rank
				n(some(groupedByRank, (G) => e(d(), c(G)))) //Check for 2 cards of the same rank, but a different one
			)),
			group(hand, $(z()))
		)(),
		fourOfAKind = (hand) => some(group(hand, $(z())), (G) => e(d(d()), c(G))),
		straightFlush = (hand) => n(o(
			n(straight(hand)),
			n(flush(hand))
		)),
		royalFlush = (hand) => n(o(
			n(straight(hand)),
			n(flush(hand)),
			n(e(ten, getCardRank(x(z(), sortByRank(hand))))) //First card is a ten
		)),
		[combination, prize] = h(
			y($(royalFlush, refilledCards), () => y('Royal flush!', twoHundredFifty)), //250
			y($(straightFlush, refilledCards), () => y('Straight flush!', p(a, d, a, d, d, d, a, d)())), //50
			y($(fourOfAKind, refilledCards), () => y('Four of a kind!', p(a, d, a, d, d, d, a)())), //25
			y($(fullHouse, refilledCards), () => y('Full house!', p(a, d, d, d)())), //8
			y($(flush, refilledCards), () => y('Flush!', p(a, d, d, a)())), //5
			y($(straight, refilledCards), () => y('Straight!', p(a, d, d)())), //4
			y($(threeOfAKind, refilledCards), () => y('Three of a kind!', p(a, d, a)())), //3
			y($(twoPairs, refilledCards), () => y('Two pairs!', d())), //2
			y($(jacksOrBetter, refilledCards), () => y('Jacks or better!', a())), //1
			y($(e()), () => y('No win.', z())) //0
		),
		newCash = a(prize, cash),
		_dummy2 = print(s( //Print the results
			'\n',
			...m((C) => s('   ', getCardDisplayName(C), '\n'), ...refilledCards),
			'\n',
			combination,
			' ',
			formatCash(newCash),
			'\n\n'
		)),
		result = i(
			$(l, round, twoHundredFifty), //Check if there haven't been too many rounds
			() => i(
				$(l, newCash, a()), //Check if the player still has money
				() => print('You have no more money. See you later!\n'),
				() =>(
					question('Press Enter to play again'),
						//Put the winning cards back in the deck, shuffle and play again
						getNextRound(shuffle(t(deckCards, ...refilledCards)), b(newCash), a(round))()
				)
			),
			() => print('You have played too much today. See you later!')
		)
	) => result,
	startGame = (
		print(s(formatCash(ten), '\n\n')),
			question('Press Enter to play'),
			getNextRound(shuffle(cards), ten, a())
	)
) => startGame())();
