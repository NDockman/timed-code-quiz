
var startButton = document.querySelector("#start-button");

var questionContainer = document.querySelector("#question-field");
var answerContainer = document.querySelector("#answer-field");
var mainContainer = document.querySelector("#main-container");
var correctOrIncorrectContainer = document.querySelector(".correct-incorrect");

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



function endQuiz() {

    console.log("end of quiz");

    mainContainer.textContent = "";

    var input = document.createElement("input");              //creates an input field
    input.setAttribute("class", "Enter your initials");
    
    var submitButton = document.createElement("button");      //creates a submit button
    submitButton.textContent = "Submit";
    
    mainContainer.append(input, submitButton);                //appends input and submit button to mainContainer

    submitButton.addEventListener("click", function() {
        var userInitialsAndScore = {
            name: input.value,
            score: totalScore
        }

        var storage = JSON.parse(localStorage.getItem("quizScores"));
        if (storage === null) {
            storage = [];
        }

        storage.push(userInitialsAndScore);
        localStorage.setItem("quizScores", JSON.stringify(storage));       //storage becomes key value

        
        showHighscores();
    })    
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

function showHighscores() {

    mainContainer.textContent = "";

    var highScoreArr = JSON.parse(localStorage.getItem("quizScores")) || [];

    var highScoresUl = document.createElement("ul");

    for (var i = 0; i < highScoreArr.length; i++) {
        var highScoresLi = document.createElement("li");
        highScoresLi.textContent = highScoreArr[i].name + ": " + highScoreArr[i].score;
        highScoresUl.append(highScoresLi);
    }
    mainContainer.append(highScoresUl);
}
