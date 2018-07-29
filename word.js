var Letter = require("./letter");

var Word = function(word) {
    this.value = word;
    this.letters = [];
    this.addLetters = function(word) {
        for (i = 0; i < word.length; i++) {
            this.letters.push(new Letter(word[i]));
        }
    }
    this.wordDisplay = function() {
        var wordDisplay = "";
        for (i = 0; i < this.letters.length; i++) {
            wordDisplay += this.letters[i] + " ";
        }
        console.log(wordDisplay);
    }
    this.guess = function(guess) {
        for (i = 0; i < this.letters.length; i++) {
            this.letters[i].check(guess);
        }
    }
}


module.exports = Word;