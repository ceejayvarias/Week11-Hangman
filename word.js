var Letter = require('./letter.js');
var gamer = require('./game.js');
var game = gamer.game;

function Word(word){
	this.word = word;
	this.lets = [];
	this.found = false;
	this.guess = [];
}

Word.prototype.getLets = function(){
		var letters = this.word.split('');
		for (var i = 0; i < letters.length; i++) {
			this.lets.push(new Letter(letters[i]));
		}
};

Word.prototype.wordRender = function() {
	var newWord = '';
	for (var i = 0; i < this.lets.length; i++) {
		this.lets[i].underScore();
		newWord += this.lets[i].lets.toUpperCase() + ' ';
	};
	return newWord;
};

Word.prototype.checkGuess = function(letter) {
	var j = 0;
	for (var i = 0; i < this.lets.length; i++) {
		if(this.lets[i].lets === letter){
			j++;
		}
	}

	if(letter == '' || letter.length > 1 || !/[a-z]/.test(letter)){
		//do nothing
	}
	else if (this.guess.length == 0 && j == 0) {
		this.guess.push(letter);
		game.guesses -= 1;
	}
	else if(j == 0){
		for (var i = 0; i < this.guess.length; i++) {
			if(letter === this.guess[i]){
				j++;
			}
		}
		if (j <= 0) {
			this.guess.push(letter);
			game.guesses -= 1;
		}
	}
};

Word.prototype.checkLetter = function(letter) {
	for (var i = 0; i < this.lets.length; i++) {
		if(letter === this.lets[i].answer){
			this.lets[i].appear = true;
		}
		this.lets[i].underScore();
	}
};

Word.prototype.checkFound = function() {
	var j = 0;
	for (var i = 0; i < this.lets.length; i++) {
		if(this.lets[i].lets === "_"){
			j++;
		}
	}
	if (j <= 0) {
		this.found = true;
	}
};

module.exports = Word;