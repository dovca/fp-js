((
	//Import FP-JS functions
	{$, _, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z} = require('../lib/functions'),
	//Function to get synchronous input
	{question} = require('readline-sync'),
	//Use random numbers
	{random} = Math,
	//Function to output a message
	print = (text) => process.stdout.write(text),
	//The number 13
	thirteen = g(a, d, d, a, d, a)(),
	//The number 25
	twentyFive = b(d(thirteen)),
	//The number 50
	fifty = d(twentyFive),
	//The number 250
	twoHundredFifty = a(fifty, d(d(fifty))),
	//The number 5
	five = g(a, d, d, a)(),
	//The number 4
	four = b(five),
	//The number 3
	three = a(d()),
	//The number 10
	ten = d(five),
	//The number 9
	nine = b(ten),
	//Function to get a card rank
	getCardRank = ([rank]) => rank,
	//Function to get a card suit
	getCardSuit = ([, , suit]) => suit,
	//Function to format a cash amount
	formatCash = (cash) => s('Cash: $', cash, i($(l, cash, a()), $(s()), $(z()))),
	//Array.prorotype.every
	every = (array, fn) => r((V, A) => n(o(n(A), n(fn(V)))), ...array, e()),
	//Array.prototype.some
	some = (array, fn) => r((V, A) => o(A, fn(V)), ...array, l()),
	//Array.protoype.sort (bubblesort)
	sort = (array, fn) => ((
		bubble = ([A, B, ...rest]) => i(
			$(e, B),
			$(y, A),
			() => i(
				$(fn, A, B),
				() => y(A, ...bubble(y(B, ...rest))),
				() => y(B, ...bubble(y(A, ...rest)))
			)
		)
	) => x(z(), w(
		([, I]) => l(z(), I),
		([result, I]) => y(bubble(result), b(I)),
		y(array, c(array))
	)))(),
	//Array of all cards
	cards = ((
			makeSequence = (start, length) => w(
				(X) => l(c(X), length), //While length of array is smaller than `length`
				(X) => t(X, a(x(b(c(X)), X))), //Append (X[-1] + 1) to X
				y(start)
			),
			rankValues = makeSequence(d(), thirteen), //Numbers from 2 to 14
			rankNames = t(makeSequence(d(), nine), 'Jack', 'Queen', 'King', 'Ace'), //Numbers from 2 to 10 and named ranks
			suits = y('Clubs', 'Diamonds', 'Hearts', 'Spades'),
			suitSymbols = y('♣', '♦', '♥', '♠'),
			zippedValues = x(z(), w( //rankValues and rankNames zipped together
				([, I]) => l(I, thirteen),
				([result, I, [V, ...values], [N, ...names]]) => y(t(result, y(V, N)), a(I), values, names),
				y(y(), z(), rankValues, rankNames)
			))
		) => x(z(), w( //Create sets of cards of each suit
			([, I]) => l(I, c(suits)),
			//Create card structure [rank, name, suit, symbol]
			([result, I]) => y(t(result, ...m((Z) => t(Z, x(I, suits), x(I, suitSymbols)), ...zippedValues)), a(I)),
			y(y(), z()) //Start with [[], 0]
		))
	)(),
	//Function to return a new shuffled array
	shuffle = (array) => ((
		fold = (values) => x(z(), w(
			([result]) => l(c(result), c(values)), //While there are still values left to pick
			([result, [head, ...H], [tail, ...T]]) => i(
				() => l(a(), d(random())),
				() => y(t(result, head), H, y(tail, ...T)), //Pick a value from the beginning
				() => y(t(result, tail), y(head, ...H), T) //Pick a value from the end
			),
			y(y(), values, v(...values))
		))
	) => g(fold, fold, fold, fold, fold)(array))(),
	//Function to group array elements by equal properties
	//group([[1], [3], [2], [4], [2], [1], [1]], 0) -> [ [[1],[1],[1]], [[2],[2]], [[4]], [[3]] ]
	group = (array, identifier) => ((
		compare = (A, B) => e(identifier(A), identifier(B))
	) => r( //reduce cards with accumulator A = [] by C:
		(C, A) => i( //if A contains a group with a card equal to C
			() => k(
				A,
				$(some(A, (V) => compare(x(z(), V), C))),
				$(l())
			),
			() => m( //then A = map A by G:
				(G) => i( //if G[0] equals C
					$(compare, x(z(), G), C),
					$(t, G, C), //then push C to G and return G
					$(G) //else return G unchanged
				),
				...A
			),
			$(t, A, y(C)) //else push [C] to A
		),
		...array,
		y()
	))(),
	//Function to sort cards by rank
	sortByRank = (C) => sort(C, (A, B) => l(getCardRank(A), getCardRank(B))),
	//Function to get the display name of a card
	getCardDisplayName = ([rank, name, suit, symbol]) => s(
		w( //Get a short name padded to length 2
			(V) => l(c(V), d()),
			(V) => s(' ', V),
			s(i($(l, ten, rank), $(x, z(), name), $(rank))) //If it's not a number, use the first letter
		),
		symbol, '\t', name, ' of ', suit
	),
	//Function that plays a new game
	getNextRound = ([c0, c1, c2, c3, c4, ...remainingDeckCards], cash, round = a()) => (
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
			([[refilled, [D, ...deck]], I]) => y(y(t(refilled, D), deck), b(I)),
			y(y(selectedCards, t(remainingDeckCards, ...discardedCards)), c(discardedCards)) //Put the discarded cards back in the deck
		)),
		jacksOrBetter = (hand) => some(
			group(f((C) => l(ten, getCardRank(C)), ...hand), getCardRank), //Filter only JQKA and group by rank
			(G) => e(d(), c(G)) //Find a group with two cards
		),
		twoPairs = (hand) => e(d(), c(f((G) => e(d(), c(G)), ...group(hand, getCardRank)))),
		threeOfAKind = (hand) => some(group(hand, getCardRank), (G) => e(three, c(G))),
		straight = (hand) => ((
			sortedNormal = sortByRank(hand),
			sortedAceRankedOne = sortByRank(m( //Ace can be the lowest card in a straight, make its rank 1
				(V) => i(
					$(e, a(thirteen), getCardRank(V)),
					$(y(a(), ...q(V))),
					$(V)
				),
				...hand
			))
		) => some(
			y(sortedNormal, sortedAceRankedOne),
			(C) => n(x(z(), w(
				([, , I]) => l(I, four),
				([result, [A, B, ...rest], I]) => y(
					//Check if the rank difference between neighboring cards is 1
					o(result, n(e(a(), b(getCardRank(B), getCardRank(A))))),
					y(B, ...rest),
					a(I)
				),
				y(l(), C, z())
			)))
		))(),
		flush = (hand) => e(a(), c(group(hand, getCardSuit))),
		fullHouse = (hand) => ((
				groupedByRank = group(hand, getCardRank)
			) => n(o(
				n(some(groupedByRank, (G) => e(three, c(G)))), //Check for 3 cards of the same rank
				n(some(groupedByRank, (G) => e(d(), c(G)))) //Check for 2 cards of the same rank, but a different one
			))
		)(),
		fourOfAKind = (hand) => some(group(hand, getCardRank), (G) => e(four, c(G))),
		straightFlush = (hand) => n(o(
			n(straight(hand)),
			n(flush(hand))
		)),
		royalFlush = (hand) => n(r(o,
			n(straight(hand)),
			n(flush(hand)),
			n(e(ten, getCardRank(x(z(), sortByRank(hand))))) //First card is a ten
		)),
		[combination, prize] = h(
			y($(royalFlush, refilledCards), $(y, 'Royal flush!', twoHundredFifty)),
			y($(straightFlush, refilledCards), $(y, 'Straight flush!', fifty)),
			y($(fourOfAKind, refilledCards), $(y, 'Four of a kind!', twentyFive)),
			y($(fullHouse, refilledCards), $(y, 'Full house!', b(nine))),
			y($(flush, refilledCards), $(y, 'Flush!', five)),
			y($(straight, refilledCards), $(y, 'Straight!', four)),
			y($(threeOfAKind, refilledCards), $(y, 'Three of a kind!', three)),
			y($(twoPairs, refilledCards), $(y, 'Two pairs!', d())),
			y($(jacksOrBetter, refilledCards), $(y, 'Jacks or better!', a())),
			y($(e()), $(y, 'No win.', z()))
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
				() => (
					question('Press Enter to play again'),
						//Put the winning cards back in the deck, shuffle and play again
						getNextRound(shuffle(t(deckCards, ...refilledCards)), b(newCash), a(round))()
				)
			),
			() => print('You have played too much today. See you later!\n')
		)
	) => result,
	startGame = (
		print(s(formatCash(ten), '\n\n')),
			question('Press Enter to play'),
			getNextRound(shuffle(cards), ten)
	)
) => startGame())();
