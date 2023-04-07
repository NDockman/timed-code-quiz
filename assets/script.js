
var startButton = document.querySelector("#start-button");
// var answerButton = document.querySelector("#answer-field button");
var questionContainer = document.querySelector("#question-field");
var answerContainer = document.querySelector("#answer-field");
var mainContainer = document.querySelector("#main-container");
var correctOrIncorrectContainer = document.querySelector(".correct-incorrect");

// var numOfQuestions = 4;

var arrayOfQuestions = [
    {
        question: "What is 3 * 5?",
        choices: ["15", "8", "10", "1"],
        correct: "15"
    },
    {
        question: "What is the capital of Japan?",
        choices: ["Kyoto", "Tokyo", "Alaska", "Edo"],
        correct: "Tokyo"
    },
    {
        question: "Which instrument belongs to the percussion family?",
        choices: ["Lute", "Oboe", "Cymbals", "Yodel"],
        correct: "Cymbals"
    }
    //TODO: make one more question
]

var timer;
var timeLeft = 60;

var totalScore = 0;
var initials;

var questionIndex = 0;

startButton.addEventListener("click", function (event) {

    // startButton.classList.add('hide');
    startButton.setAttribute("class", "hide");
    renderQuestion();
    startTimer();
})

function renderQuestion() {
    questionContainer.textContent = "";
    answerContainer.textContent = "";

    if (questionIndex >= arrayOfQuestions.length) {
        return
    }

    var questionEl = document.createElement("h1");
    questionEl.setAttribute("class", "question");
    questionEl.textContent = arrayOfQuestions[questionIndex].question;

    for (var x = 0; x < arrayOfQuestions[questionIndex].choices.length; x++) {

        var choicesEl = document.createElement("button");
        choicesEl.textContent = arrayOfQuestions[questionIndex].choices[x];
        answerContainer.append(choicesEl);

        choicesEl.addEventListener("click", function (event) {
            if (event.target.textContent === arrayOfQuestions[questionIndex].correct) {
                console.log("correct");
                totalScore += 25;
                correctOrIncorrectContainer.textContent = "Correct";
            }
            else {
                console.log("incorrect");
                timeLeft -= 10;
                correctOrIncorrectContainer.textContent = "Incorrect";
            }
            questionIndex++;
            renderQuestion();
        })
    }

    questionContainer.append(questionEl);
}



//TODO: find a way to test each of the 4 answer buttons
// answerButton.addEventListener("click", function(event) {
//     if (event.target.dataset.state === "correct") {
//         answeredCorrect();
//         console.log("you answered correct");
//     }
//     else {
//         answeredIncorrect();
//         console.log("you answered incorrect");
//     }
//     goToNextQuestion();
// })



function endQuiz() {

    console.log("end of quiz");

    mainContainer.textContent = "";

    // create an input and a button
    var input = document.createElement('input');     //creates an input field
    input.setAttribute('placeholder', 'Name');
    
    var submitButton = document.createElement('button');      //creates a submit button
    submitButton.textContent = "Submit";
    
    // append them to main container
    mainContainer.append(input, submitButton);

    // add event listener to this button
    submitButton.addEventListener('click', function() {

        // get the value of the input and the totalscore var and put them into an object
        var userData = {
            name: input.value,
            score: totalScore
        }

        // save it to local storage
        var storage = JSON.parse(localStorage.getItem("quizScores"));
        if (storage === null) {
            storage = [];
        }

        storage.push(userData);
        localStorage.setItem('quizScores', JSON.stringify(storage));
        window.location.href = 'highscore.html';
    })

    saveScore();
}





function startTimer() {
    timer = setInterval(function () {
        if (timeLeft <= 0 || questionIndex >= arrayOfQuestions.length) {
            clearInterval(timer);
            endQuiz();
        }
        else {
            timeLeft--;
            document.getElementsByClassName("time-clock")[0].textContent = "Time: " + timeLeft;
        }
    }, 1000)
}



//when the quiz ends, user enters initials and saves them to a list of previous scores
function saveScore() {

}
