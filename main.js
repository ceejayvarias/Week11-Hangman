// var Letter = require('./letter.js');
var Word = require('./word.js');
var inquirer = require('inquirer');

var gamer = require('./game.js');
var game = gamer.game;

var random = Math.floor(Math.random() * (game.wordBank.length));
var randomWord = new Word(game.wordBank[random]);
randomWord.getLets();

function playAgain(){
	inquirer.prompt([
		{
			type: 'list',
			name: 'list',
			message: 'Play Again?',
			choices: [
				'Yes',
				'No',
			]
		}

	]).then(function(answer){
		if (answer.list == 'Yes') {
			game.guesses = 5;
			random = Math.floor(Math.random() * (game.wordBank.length));
			randomWord = new Word(game.wordBank[random]);
			randomWord.getLets();
			Hangman();
		}
		else{
			console.log('Thanks for playing!');
		}
	});
}

function Hangman(){
	var randomLetters = randomWord.wordRender();

	inquirer.prompt([
		{
			type: "input",
			name: "guess",
			message: randomLetters + "\nGuess a letter > "
		}

	]).then(function(answer) {
		randomWord.checkLetter(answer.guess.toLowerCase());
		randomWord.checkGuess(answer.guess.toLowerCase());
		randomWord.checkFound();
		if (!randomWord.found && game.guesses > 0) {
			console.log("\n-------------");
			console.log("Guesses remaining: " + game.guesses);
			console.log("Letters guessed: " + randomWord.guess);
			console.log("-------------\n");
			Hangman();
		}
		else if(game.guesses == 0){
			console.log('You lose!');
			console.log('The word was: ' + randomWord.word.toUpperCase());
			playAgain();
		}
		else{
			console.log('Congrats you won!');
			console.log('The word was: ' + randomWord.word.toUpperCase());
			playAgain();
		}
	});
}

Hangman();