var Word = require("./word");
var inquirer = require("inquirer");

var count = 0;
var remainingGuesses = 10;
var lettersGuessed = [];
var match = false;
var lettersCorrect1 = 0;
var lettersCorrect2 = 0;

var words = ["plank", "chocolate", "roar", "chase", "safari", "debate", "renew"];

var numberGuess = Math.floor(Math.random() * words.length);
var wordGuess = words[numberGuess];

var wordToGuess = new Word(wordGuess);

var startGame = function() {

    count = 0;
    remainingGuesses = 10;
    lettersGuessed = [];
    match = false;
    lettersCorrect1 = 0;
    lettersCorrect2 = 0;

    console.log("=============================")
    console.log("Welcome to word guess!")
    console.log("=============================")
    console.log(" ");

    numberGuess = Math.floor(Math.random() * words.length);
    wordGuess = words[numberGuess];

    wordToGuess = new Word(wordGuess);
    wordToGuess.addLetters(wordToGuess.value);
    wordToGuess.wordDisplay();

    console.log(" ");
    promptFunc(remainingGuesses, lettersCorrect2);
}

var playAgain = function() {
    inquirer.prompt([
        {
            name: "playAgain",
            type: "confirm",
            message: "Do you want to play again?",
        }
    ]).then(function(answer) {
        if (answer.playAgain) {
            startGame();
        }
        else {
            return;
        }
    })
}


var promptFunc = function(remainingGuesses, lettersCorrect2) {
    lettersCorrect1 = lettersCorrect2;
    if (remainingGuesses > 0) {
        console.log("Guesses Remaining: " + remainingGuesses);
        inquirer.prompt([
            {
                name: "letterInput",
                message: "Please Guess A Letter.."
            }
        ]).then(function(answer) {
            match = false;
            for (i=0; i < lettersGuessed.length; i++) {
                if (answer.letterInput === lettersGuessed[i]) {
                    match = true;
                }
            }
            
            if (!match) {
                lettersGuessed.push(answer.letterInput);            
                wordToGuess.guess(answer.letterInput);
                count = 0;
                
                for (i=0; i < wordToGuess.letters.length; i++) {
                    if (wordToGuess.letters[i].guessed === true) {
                        count++;
                    }
                }

                lettersCorrect2 = count;

                
                if (count === wordToGuess.letters.length) {
                    wordToGuess.wordDisplay();
                    console.log("You Win");
                    playAgain();
                }
                else {

                    if (lettersCorrect2 > lettersCorrect1) {
                        console.log("Correct!");
                        wordToGuess.wordDisplay();
                        console.log(" ");
                        promptFunc(remainingGuesses, lettersCorrect2);
                    }
                    else {
                        remainingGuesses--;
                        console.log("Incorrect.")

                        if (remainingGuesses === 0) {
                            console.log("You Lost :(")
                            console.log("Correct Word: " + wordGuess);
                            console.log(" ");
                            playAgain();
                        }
                        else {
                            wordToGuess.wordDisplay();
                            console.log(" ");
                            promptFunc(remainingGuesses, lettersCorrect2);
                        }
                    }     
                }
            }
            else {
                console.log("Letter Already Guessed");
                console.log(" ");
                promptFunc(remainingGuesses, lettersCorrect2);
            }
            
            
        })
    }  
}
startGame();