var timer = document.getElementById("timer");
var startTimer = document.getElementById("start");
var resetBtn = document.getElementById("reset");
var wins = 0 || localStorage.getItem("wins");
var losses = 0 || localStorage.getItem("losses");
var winText = document.getElementById("wins");
var loseText = document.getElementById("losses");
var availableWords = ["HELLO", "JAVASCRIPT", "OBJECT", "FUNCTION", "ELEMENT", "CASCADING", "STYLESHEET"];
var secondsLeft = 10;
var word = document.getElementById("guess-word");
var splitWord = [];
var blankLetters = [];


winText.textContent = localStorage.getItem("wins");
loseText.textContent = localStorage.getItem("losses");

// When start button clicked, start timer and display word
startTimer.addEventListener("click", beginGame);
function beginGame() {
    if (secondsLeft > 0) {
        countdown();
        pickRandomWord();
    } else {
        resetGame(); // works well
    }
}

// When reset button clicked, reset scores to 0
resetBtn.addEventListener("click", function(){
    resetGame();
    localStorage.clear();
    wins = 0;
    losses = 0;
    winText.textContent = "";
    loseText.textContent = "";
});

//Randomize words to display
function pickRandomWord() {
    var random = Math.floor(Math.random() * availableWords.length);
    var chosenWord = availableWords[random];
    console.log("chosenWord: " + chosenWord);

    splitWord = chosenWord.split("");
    console.log("splitWord: " + splitWord);
    
    for (var i = 0; i < splitWord.length; i++) {
        blankLetters.push("_");
    }
    // Prints blank spaces to the screen with space in between
    word.append(blankLetters.join(" "));
}

// Each time a key is ipressed, change to uppercase and check if pressed key is in the word
document.addEventListener("keydown", function (event) {
    var guessLetter = event.key.toUpperCase();
    console.log(guessLetter);

    checkLetters(guessLetter);
    wordComplete();
})

// Check to see if pressed letter is part of the mystery word
function checkLetters(letter){
    console.log("Letter: " + letter);
    for(var i=0; i< splitWord.length; i++){
        if (splitWord[i] === letter){
                blankLetters[i]=letter;
                console.log("BlankLetters: " + blankLetters)
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

        resetGame(); //makes time go faster and doesn't stop at 0
        beginGame();
    }
}

// Reset arrays and timer
function resetGame(){ 
    splitWord = [];
    blankLetters = [];
    secondsLeft = 10;
    timer.textContent = secondsLeft + " seconds";
    word.innerHTML = "";
}

// Countdown time left
function countdown() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timer.textContent = secondsLeft + " seconds";
        
        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            losses++;
            loseText.textContent = losses;
            localStorage.setItem("losses", losses);
        }
    }, 1000);
}