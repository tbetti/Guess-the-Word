var timer = document.getElementById("timer");
var startTimer = document.getElementById("start");
var availableWords = ["hello", "JavaScript", "object", "function", "element", "cascading", "stylesheet"];
var secondsLeft = 10;
var word = document.getElementById("guess-word");


//Randomize words to display
function pickRandomWord(){
    var random = Math.floor(Math.random()*availableWords.length); // check this
    var chosenWord = availableWords[random];
    word.textContent = chosenWord;
}

// Countdown time left
function countdown(){
    var timerInterval = setInterval(function(){
        secondsLeft--;
        timer.textContent = secondsLeft + " seconds";
        
        if (secondsLeft===0){
            clearInterval(timerInterval);
        }
    }, 1000);
}

// Start timer and display word when start button clicked
startTimer.addEventListener("click", function() {
    if (secondsLeft > 0){
        countdown();
        pickRandomWord();
    } else {
        secondsLeft = 10;
        timer.textContent = secondsLeft + " seconds";
        countdown();    
        pickRandomWord();
    }
});
