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

var playerCardsToSwap = [];

var dealerRank = '-';
var playerRank = '-';

var newRoundButton;
var revealDealerHandButton;
var sortHandButton;
var swapCardsButton;


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
	revealDealerHandButton.show();

	sortHandButton = createButton('Sort Hand');
	sortHandButton.position(width / 4 - 100, 100);
	sortHandButton.mousePressed(sortPlayerHand);
	sortHandButton.show();

	swapCardsButton = createButton('Swap Cards');
	swapCardsButton.position(width * 0.75, 100);
	swapCardsButton.mousePressed(swapCards);
	swapCardsButton.show();
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
	background(0);
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
		let card = deck.popCard();
		player_hand.addCard(card, to_reveal=true);
	}
	player_hand.display();

	dealer_hand = new Hand(width / 2 - CARD_WIDTH * 3, height - CARD_HEIGHT - 100, deck, 2);
	for (let i = 0; i < MAX_HAND_CARDS; i++){
		let card = deck.popCard();
		dealer_hand.addCard(card, to_reveal=false);
	}
	dealer_hand.display();
	setRanks();
	displayRanks(true, false);

	newRoundButton.hide();
	revealDealerHandButton.show();
	swapCardsButton.show();
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

function swapCards(){
	for (let i = player_hand.count() - 1; i >= 0; i--){
		if (player_hand.getCard(i).isChosen()){
			let card = player_hand.popCard(i);
			deck.pushFront(card);
			card = deck.popCard();
			player_hand.addCard(card, to_reveal=true);
		}
	}
	setRanks();
	redrawGame();
	swapCardsButton.hide();
}

function checkWinner(){
	let playerRank = player_hand.rank();
	let dealerRank = dealer_hand.rank();

	if (playerRank[0] > dealerRank[0]){
		displayMessage('Player Wins!', color(0, 250, 0));
	}
	else if (playerRank[0] < dealerRank[0]){
		displayMessage('Dealer Wins!', color(250, 0, 0));
	}
	else if (playerRank[1] > dealerRank[1]){
		displayMessage('Player Wins!', color(0, 250, 0));
	}
	else if (playerRank[1] < dealerRank[1]){
		displayMessage('Dealer Wins!', color(250, 0, 0));
	}
	else{
			displayMessage('Tie!', color(255));
	}
	displayRanks(true, true);
	newRoundButton.show();
	revealDealerHandButton.hide();
}

function mousePressed(){
	for (var card of player_hand.cards_list){
		if (card.isClicked(mouseX, mouseY)){
			if (!card.isChosen()){
				card.setChosen(true);
				playerCardsToSwap.push(card);
				card.display();
			}
			else{
				card.setChosen(false);
				card.display();
			}
			return;
		}
	}
}
