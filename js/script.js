/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/ 

var scores, roundScore, activePlayer, gamePlaying;
init();

// roll dice button
// callback function, the listener calls the btn function for us
// anonymous function is a function that doesn't have a name
document.querySelector('.btn-roll').addEventListener('click', function(){
	if (gamePlaying) {
		// 1 . Random Number
		// Math.floor ignores the decimal point
		var dice0 = Math.floor(Math.random() * 6 ) + 1;
		var dice1 = Math.floor(Math.random() * 6 ) + 1;

		// 2. Display the result
		// displays the dice 
		document.getElementById('dice-0').style.display = 'block';
		document.getElementById('dice-1').style.display = 'block';
		// changes the dice image
		document.getElementById('dice-0').src = 'img/dice-' + dice0 + '.png';
		document.getElementById('dice-1').src = 'img/dice-' + dice1 + '.png';
		console.log(dice0);

		// 3. Update the round score IF the rolled number was not a 1
		if (dice0 === 6 && dice1 === 6) {
			// Player looses score
			scores[activePlayer] = 0;
			// Update the user interface, sets the score to zero
			document.querySelector('#score-' + activePlayer).textContent = 0;
			nextPlayer();

		} else if (dice0 !== 1 ) {
			// Adds score
			roundScore += dice0 + dice1;
			// displays it to user interface
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else {
			// next player
			nextPlayer();
		}
	}
});

// updates the GLOBAL score

document.querySelector('.btn-hold').addEventListener('click', function(){
	if (gamePlaying) {
		// Adds CURRENT score to GLOBAL score
		scores[activePlayer] += roundScore;

		// Update the user interface
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		// gets the final score value from the input field
		var input = document.querySelector('.final-score').value;
		var winningScore;
		// Undefined, 0, null or "" are COERCED to false
		// Anything else is COERCED to true
		if (input) {
			winningScore = input;
		} else {
			winningScore = 100;
		}
		// check if the player won the game
		if (scores[activePlayer] >= winningScore) {
			// changes the player's name to 'Winner'
			document.querySelector('#name-' + activePlayer).textContent = 'Winner';
			// hides the dice
			document.querySelector('#dice-0').style.display = 'none';
			document.querySelector('#dice-1').style.display = 'none';
			// adds the winner css class
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			// removes the active player
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			// next player
			nextPlayer();
		}
	}
});

// changes the current active player

function nextPlayer() {
	//next player
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	
	// sets the score to zero
	roundScore = 0;

	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	// changes the active player - toggle checks if the class is there or not
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
	//document.querySelector('.player-0-panel').classList.remove('active');
	//document.querySelector('.player-1-panel').classList.add('active');

	// hides the dice
	document.getElementById('dice-0').style.display = 'none';
	document.getElementById('dice-1').style.display = 'none';

}

// sets the scores to zero when clicking the 'new game' button
document.querySelector('.btn-new').addEventListener('click', init);

// sets the scores to zero, it's the very first function to run
function init() {
	gamePlaying = true;
	scores = [0,0];
	roundScore = 0;
	// 0 is the first player, 1 is the second player
	activePlayer = 0;

	// selects the id
	// document.querySelector('#current-' + activePlayer).textContent = dice;
	// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';


	// hides the dice in the beginning
	document.getElementById('dice-0').style.display = 'none';
	document.getElementById('dice-1').style.display = 'none';

	// sets the scores to zero
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	// changes the players names
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	// removes the 'winner' and 'active' css classes
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	//adds player one to active
	document.querySelector('.player-0-panel').classList.add('active');
}