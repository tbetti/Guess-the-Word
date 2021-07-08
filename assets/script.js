var timer = document.getElementById("timer");
var startTimer = document.getElementById("start");
var availableWords = ["HELLO", "JAVASCRIPT", "OBJECT", "FUNCTION", "ELEMENT", "CASCADING", "STYLESHEET"];
var secondsLeft = 10;
var word = document.getElementById("guess-word");
var splitWord = [];
var blankLetters = [];


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

document.addEventListener("keydown", function (event) {
    // console.log(event.code);
    var guessLetter = event.key.toUpperCase(); // const can't be reassigned
    console.log(guessLetter);
    var possibleCharactrs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var characterArray = possibleCharactrs.split();

    checkLetters(guessLetter);
})

// Countdown time left
function countdown() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timer.textContent = secondsLeft + " seconds";
        
        if (secondsLeft === 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
}

// Start timer and display word when start button clicked
startTimer.addEventListener("click", function () {
    if (secondsLeft > 0) {
        countdown();
        pickRandomWord();
    } else {
        secondsLeft = 10;
        timer.textContent = secondsLeft + " seconds";
        countdown();
        pickRandomWord();
    }
});
