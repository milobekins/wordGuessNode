var Letter = function(letter) {
    this.value = letter;
    this.guessed = false;
    this.toString = function() {
        if (this.guessed === true) {
            return this.value;
        }
        else {
            return "_";
        }
    }
    this.check = function(guess) {
        if (guess === this.value) {
            this.guessed = true;
        }
        else {
        }
    }
}

module.exports = Letter;

