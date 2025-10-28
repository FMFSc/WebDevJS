/**
 * @ Author: Fellipe M Fumagali Scirea
 * @ BCIT Student # : A01181350
 * @ Created: 10-27-2025
 * @ Description: COMP 2132 Assignment 05 - Deliverable as part of coursework.
 */


/*
Take note of the comments throughout this page
Follow their directions as to what to code and where
*/

/* Part 1: Injection of Content into the HTML file
 *  This injection will use the pre-existing hooks and placement already in use.
 */
//Pointing to part 1 sections
const part1TitleEl = document.querySelector('#part1 [data-title="part1"]');
const part1BodyEl = document.querySelector('#part1 [data-body="part1"]');

//Replacing title
if (part1TitleEl) {
    part1TitleEl.textContent = 'Part 1 — Card Preview';
}

// (C) Render helper that targets Part 1’s body/output
function printToPart1(text) {
    if (!part1BodyEl) return;
    // Replace the default text with your output
    part1BodyEl.textContent = text;
}

/*
PART 1a
---------------------------------------
DEFINE A Card OBJECT
---------------------------------------
*/
//Card function, with characteristics for each individual card.
function Card(face, value, suit) {
    this.face = face;
    this.value = value;
    this.suit = suit;
}

Card.prototype.describeSelf = function () {
    const suitLabel = this.suit.endsWith('s') ? this.suit : this.suit + ('s');
    return `${this.face} of ${suitLabel}. Value: ${this.value}`;
}

/*
PART 1b
INSTANTIATE A Card OBJECT and 
display the value returned by the describeSelf() function
*/

const sampleCard = new Card('Ace', 1, 'Spade');
printToPart1(sampleCard.describeSelf());


/*
PART 2a
---------------------------------------
DEFINE A Deck OBJECT
---------------------------------------
Note: Most of the Deck class code should
      not be modified in any way. The only
      Deck code that needs changing is inside the 
      constructor() function. Change nothing else in Deck. 
*/
class Deck {
    constructor() {

        //build a deck of Card objects
        //prepare arrays for all the aspects of a Card
        this.faces = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];
        this.values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
        this.suits = ["Spade", "Club", "Heart", "Diamond"];

        //prepare an array to store the Cards in
        this.cards = [];

        //use nested 'for' loops
        //build the Deck of Cards
        for (let s = 0; s < this.suits.length; s++) {
            const suit = this.suits[s]; // one iteration for each suit

            for (let i = 0; i < this.faces.length; i++) {
                // one iteration for each face/value pair
                const face = this.faces[i];
                const value = this.values[i];

                // each time, instantiate a new Card Object
                const card = new Card(face, value, suit);

                // add new cards to the array using Array.push()
                this.cards.push(card);
            }
        }
    }
}

/*
DEFINING Deck OBJECT FUNCTIONS
no changes need to be made 
in the rest of this Deck class definition.
*/
Deck.prototype.dealCard = function () {
    //remove and return the first item in array
    //and shift the index of remaining items 
    const card = this.cards.shift();
    //if we have run out of cards...
    if (card === undefined) {
        return 'No more cards';
    } else {
        //return the next card in the array
        return card;
    }
}
Deck.prototype.shuffle = function () {

    let j, x, i;
    //loop through the entire array
    for (i = this.cards.length - 1; i > 0; i--) {
        //randomly select a card
        j = Math.floor(Math.random() * (i + 1));
        x = this.cards[i];
        //resort cards
        this.cards[i] = this.cards[j];
        this.cards[j] = x;
    }
    //return the randomly sorted array
    return this.cards;
}
Deck.prototype.describeSelf = function () {
    let description = "";
    description += `This deck of cards has ${this.cards.length} card(s) in it`;
    //return the above statement 'description'
    return description;
}
/*
---------------------------------------
end Deck class
---------------------------------------
*/



/*
PART 2b
INVOKE AND DISPLAY Deck OBJECT FUNCTIONS
*/
const part2TitleEl = document.querySelector('#part2 [data-title="part2"]');
const part2BodyEl = document.querySelector('#part2 [data-body="part2"]');

// Set the title (as you showed)
if (part2TitleEl) part2TitleEl.textContent = 'Part 2 — Deck';

// Helper: clear the default paragraph so only our lines show
function resetPart2() {
    if (part2BodyEl) part2BodyEl.textContent = '';
}

// Helper: append one line into Part 2
function writeLine(text) {
    if (!part2BodyEl) return;
    const div = document.createElement('div');
    div.textContent = text;
    part2BodyEl.appendChild(div);
}

// Instantiate a new Deck
const deck = new Deck();

// Start fresh: remove "This is the default paragraph for part 2."
resetPart2();

// 1) describeSelf() BEFORE shuffle (show 52 cards)
writeLine(deck.describeSelf());

// 2) shuffle the deck — silently (no output line)
deck.shuffle();

// 3) dealCard() + describeSelf()
let dealt = deck.dealCard();
writeLine(typeof dealt === 'string' ? dealt : `Dealt: ${dealt.describeSelf()}`);
writeLine(deck.describeSelf());

// 4) dealCard() + describeSelf() again
dealt = deck.dealCard();
writeLine(typeof dealt === 'string' ? dealt : `Dealt: ${dealt.describeSelf()}`);
writeLine(deck.describeSelf());


/*
PART 3a
---------------------------------------
DEFINE A Player OBJECT
---------------------------------------
*/

function Player(name) {
    // The constructor should require a string parameter for the player’s name
    this.name = String(name);

    // Initialize an empty array for storing one or more Cards (the Player’s ‘hand’)
    this.hand = [];
}

// addCardToHand(aCard): push a Card Object into the Player’s hand
Player.prototype.addCardToHand = function (aCard) {
    // Basic guard: only accept objects that look like a Card
    if (aCard && typeof aCard.describeSelf === 'function') {
        this.hand.push(aCard);
    }
};

// describeSelf(): return a string that includes the Player’s name
// and an HTML list of all the Cards in the Player’s hand
Player.prototype.describeSelf = function () {
    const items = this.hand.map(card => `<li>${card.describeSelf()}</li>`).join('');
    return `<strong>${this.name}</strong><ul>${items}</ul>`;
};

/*
PART 3b
Instantiate at least two Player OBJECTs
Instantiate a new Deck and shuffle() it
Deal five Cards to each Player
Display each players hand to the browser
*/

/*
PART 3b
Instantiate at least two Player OBJECTs
Instantiate a new Deck and shuffle() it
Deal five Cards to each Player
Display each players hand to the browser
*/
const part3TitleEl = document.querySelector('#part3 [data-title="part3"]');
const part3BodyEl  = document.querySelector('#part3 [data-body="part3"]');

// Title for Part 3
if (part3TitleEl) part3TitleEl.textContent = 'Part 3 — Players';

// Clear the default paragraph so only our results show
function resetPart3() {
  if (part3BodyEl) part3BodyEl.innerHTML = '';
}

// Append HTML into Part 3 body
function writeHTMLToPart3(html) {
  if (!part3BodyEl) return;
  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  part3BodyEl.appendChild(wrapper);
}

// Instantiate players (different names)
const player1 = new Player('Alice');
const player2 = new Player('Bob');

// New deck and shuffle it
const deckForPlayers = new Deck();
deckForPlayers.shuffle();

// Deal five cards to each player (alternate draws)
for (let i = 0; i < 5; i++) {
  player1.addCardToHand(deckForPlayers.dealCard());
  player2.addCardToHand(deckForPlayers.dealCard());
}

// Display each player's hand to the browser
resetPart3();
writeHTMLToPart3(player1.describeSelf());
writeHTMLToPart3(player2.describeSelf());
