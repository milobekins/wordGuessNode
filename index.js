var Word = require("./word");
var inquirer = require("inquirer");

var count = 0;
remainingGuesses = 10;

var words = ["plank", "chocolate", "roar", "chase", "safari", "debate", "renew"];
console.log("=============================")
console.log("Welcome to word guess!")
console.log("=============================")
console.log(" ");

var numberGuess = Math.floor(Math.random() * words.length);
var wordGuess = words[numberGuess];

var wordToGuess = new Word(wordGuess);
wordToGuess.addLetters(wordToGuess.value);
wordToGuess.wordDisplay();

console.log(" ");

var promptFunc = function(remainingGuesses) {

    if (remainingGuesses > 0) {
        console.log("Guesses Remaining: " + remainingGuesses);
        inquirer.prompt([
            {
                name: "letterInput",
                message: "Please Guess A Letter.."
            }
        ]).then(function(answer) {
            remainingGuesses--; 
            wordToGuess.guess(answer.letterInput);
            count = 0;
            for (i=0; i < wordToGuess.letters.length; i++) {
                if (wordToGuess.letters[i].guessed === true) {
                    count++
                }
            }
            
            if (count === wordToGuess.letters.length) {
                wordToGuess.wordDisplay();
                console.log("You Win");
                return
            }
            else if (remainingGuesses === 0) {
                wordToGuess.wordDisplay();
                console.log("You Lost");
                return
            }
            else {
                wordToGuess.wordDisplay();
                promptFunc(remainingGuesses);
            }
            
        })
    }  
}
promptFunc(remainingGuesses);
