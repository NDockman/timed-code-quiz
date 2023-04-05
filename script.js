
var startButton = document.querySelector("#start-button")
var answerButton = document.querySelector("#answer-field button");

var arrayOfQuestions = ["3 + 8 =", "4 - 2 =", "5 * 3 ="];
var currentQuestion;

var arrayOfCorrectAnswers = ["11", "2", "15"];
var arrayOfIncorrectAnswers = [];
var currentCorrectAnswer;
var currentIncorrectAnswers;

var rightOrWrong = ["Correct", "Incorrect"];

var timer;
var timeLeft = 60;

var totalScore = 0;
var initials;






answerButton.addEventListener("click", function() {
    goToNextQuestion();
})

startButton.addEventListener("click", function(event) {
    startQuiz();
})



function startQuiz() {
    startTimer();
}

function endQuiz() {

}

function startTimer() {
    timer = setInterval(function() {
        if (timeLeft === 0) {        //might need to do timeLeft <= 0 because of answeredIncorrect()
            clearInterval(timer);
            endQuiz();
        }
        else {
            timeLeft--;
            document.getElementsByClassName("time-clock")[0].textContent = timeLeft;
        }
    }, 1000)
}

//need a function that progresses quiz to the next question?
function goToNextQuestion() {

}

//when a correct answer is selected, add to the score
function answeredCorrect() {

}

//when an incorrect answer is given, subtract ten seconds
function answeredIncorrect() {
    timeLeft = timeLeft - 10;
}

//when the quiz ends, user enters their initials and saves them to a list of previous scores
function saveScore() {

}
