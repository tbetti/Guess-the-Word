// Create variables for HTML elements
var timer = document.getElementById("timer");
var startTimer = document.getElementById("start");
var resetBtn = document.getElementById("reset");
var word = document.getElementById("guess-word");
var winText = document.getElementById("wins");
var loseText = document.getElementById("losses");
var timerInterval;

// Create arrays for words
var availableWords = ["HELLO", "JAVASCRIPT", "OBJECT", "FUNCTION", "ELEMENT", "CASCADING", "STYLESHEET", "ALGORITHM", "APPLICATIONI", "ARRAY", "BINARY", "BROWSER", "VARIABLE", "DATABASE", "DNS", "ITERATION", "KEYWORD", "STORAGE", "SERVER", "URL", "XML"];
var splitWord = [];
var blankLetters = [];

// Set up the game
var secondsLeft = 10;
var wins = 0 || localStorage.getItem("wins");
var losses = 0 || localStorage.getItem("losses");
winText.textContent = localStorage.getItem("wins");
loseText.textContent = localStorage.getItem("losses");

// When start button clicked, start timer and display word
startTimer.addEventListener("click", beginGame);
function beginGame() {
    if (secondsLeft > 0) {
        countdown();
        pickRandomWord();
    } else {
        resetGame();
    }
}

// When reset button clicked, reset scores to 0
resetBtn.addEventListener("click", function(){
    wins = 0;
    losses = 0;
    winText.textContent = "";
    loseText.textContent = "";
    
    localStorage.clear();
    resetGame();
});

//Randomize words to display
function pickRandomWord() {
    var random = Math.floor(Math.random() * availableWords.length);
    var chosenWord = availableWords[random];
    splitWord = chosenWord.split("");
    // Prints blank spaces to the screen with space in between
    for (var i = 0; i < splitWord.length; i++) {
        blankLetters.push("_");
    }
    word.append(blankLetters.join(" "));
}

// Each time a key is pressed, change to uppercase and check if pressed key is in the word
document.addEventListener("keydown", function (event) {
        var guessLetter = event.key.toUpperCase();
        checkLetters(guessLetter);
        wordComplete();
        // this is needed to stop the game from listening for a "keydown"
        if (secondsLeft === 0){
            word.innerHTML = "Game Over";
        }
})



// Check to see if pressed letter is part of the mystery word
function checkLetters(letter){
    for(var i=0; i< splitWord.length; i++){
        if (splitWord[i] === letter){
                blankLetters[i]=letter;
        }   
    }
    word.textContent=blankLetters.join(" ");
}

// If word is complete, update win score and reset game
function wordComplete(){
    var userGuess = blankLetters.join("");
    var actualWord = splitWord.join("");

    if (userGuess === actualWord){
        wins++;
        winText.textContent = wins;
        localStorage.setItem("wins", wins);

        resetGame();
        beginGame();
    }
}

// Reset arrays and timer
function resetGame(){ 
    splitWord = [];
    blankLetters = [];
    clearInterval(timerInterval);

    secondsLeft = 10;
    timer.textContent = secondsLeft + " seconds";
    word.innerHTML = "";
}

// Countdown time left
function countdown() {
    timerInterval = setInterval(function () {
        secondsLeft--;
        timer.textContent = secondsLeft + " seconds";
        
        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            losses++;
            loseText.textContent = losses;
            localStorage.setItem("losses", losses);
            word.innerHTML = "Game Over";
        }
    }, 1000);
}