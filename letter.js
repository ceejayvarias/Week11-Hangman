function Letter(lets){
	this.lets = '';
	this.answer = lets;
	this.appear = false;
}

Letter.prototype.underScore = function() {
	if (!this.appear) {
		this.lets = "_";
	}
	else{
		this.lets = this.answer;
	}
};

module.exports = Letter;