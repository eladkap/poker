const SCREEN_WIDTH = 1400;
const SCREEN_HEIGHT = 800;

const CARD_SYMBOLS = ['-', '-', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const CARD_SHAPES = ['\u2660', '\u2665', '\u2663', '\u2666'];

const CARD_WIDTH = 80;
const CARD_HEIGHT = 120;
const CARD_FONT_SIZE = 14;

const MAX_HAND_CARDS = 5;


var deck;

var dealer_hand;
var player_hand;

var dealerRank = '-';
var playerRank = '-';

var newRoundButton;
var revealDealerHandButton;
var sortHandButton;


function setup() {
	createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
	background(0);
	setupGame();
	noLoop();
}

function draw() {

}

function setupGame(){
	setButtons();
	resetRound();
}

function setButtons(){
	newRoundButton = createButton('New Round');
	newRoundButton.position(width / 2, height / 2);
	newRoundButton.mousePressed(resetRound);
	newRoundButton.hide();

	revealDealerHandButton = createButton('Reveal Dealer Hand');
	revealDealerHandButton.position(width / 2, height / 2 + 100);
	revealDealerHandButton.mousePressed(revealDealerHand);
	revealDealerHandButton.show(); // hide

	sortHandButton = createButton('Sort Hand');
	sortHandButton.position(width / 4 - 100, 100);
	sortHandButton.mousePressed(sortPlayerHand);
	sortHandButton.show();
}

function setRanks(){
	let [player_r, player_b] = player_hand.rank();
	let [dealer_r, dealer_b] = dealer_hand.rank();
	playerRank = HAND_RANKS[player_r] + ' of ' + CARD_SYMBOLS[player_b];
	dealerRank = HAND_RANKS[dealer_r] + ' of ' + CARD_SYMBOLS[dealer_b];
}

function displayMessage(msg, msg_color){
	noStroke();
	fill(msg_color);
	textSize(32);
	text(msg, width / 2 - 200, height / 2 - 100);
}

function displayRanks(player_flag, dealer_flag){
	noStroke();
	fill(200);
	textSize(24);
	if (player_flag){
		text(playerRank, player_hand.x - 300 , player_hand.y + CARD_HEIGHT / 2);
	}
	if (dealer_flag){
		text(dealerRank, dealer_hand.x - 300, dealer_hand.y + CARD_HEIGHT / 2);
	}
}

function redrawGame(){
	player_hand.display();
	dealer_hand.display();
	displayRanks(true, false);
}

function sortPlayerHand(){
	background(0);
	player_hand.sortHand();
	redrawGame();
}

function resetRound(){
	background(0);
	deck = new Deck(1);
	deck.shuffleCards();
	player_hand = new Hand(width / 2 - CARD_WIDTH * 3, 100, deck, 1);
	for (let i = 0; i < MAX_HAND_CARDS; i++){
		player_hand.addCard(deck, to_reveal=true);
	}
	player_hand.display();

	dealer_hand = new Hand(width / 2 - CARD_WIDTH * 3, height - CARD_HEIGHT - 100, deck, 2);
	for (let i = 0; i < MAX_HAND_CARDS; i++){
		dealer_hand.addCard(deck, to_reveal=false);
	}
	dealer_hand.display();
	setRanks();
	displayRanks(true, false);

	newRoundButton.hide();
	revealDealerHandButton.show();
}

function revealDealerHand(){
	background(0);
	for (let card of dealer_hand.cards_list){
		card.reveal()
	}
	player_hand.display();
	dealer_hand.display();
	revealDealerHandButton.hide();
	checkWinner();
}

function checkWinner(){
	if (player_hand.rank() > dealer_hand.rank()){
		displayMessage('Player Wins!', color(0, 250, 0));
	}
	else if (player_hand.rank() < dealer_hand.rank()){
		displayMessage('Dealer Wins!', color(250, 0, 0));
	}
	else{
		displayMessage('Tie!', color(255));
	}
	displayRanks(true, true);
	newRoundButton.show();
	revealDealerHandButton.hide();
}
