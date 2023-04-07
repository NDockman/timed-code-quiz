
var startButton = document.querySelector("#start-button")
var answerButton = document.querySelector("#answer-field button");
var questionContainer = document.querySelector("#question-field")
var answerContainer = document.querySelector('#answer-field')
var mainContainer = document.querySelector('#main-container')

// var numOfQuestions = 4;

// var arrayOfQuestions = ["3 + 8 =", "4 - 2 =", "5 * 3 ="];
// var currentQuestion = arrayOfQuestions[0];

// var arrayOfCorrectAnswers = ["11", "2", "15"];
// var arrayOfIncorrectAnswers = [];
// var currentCorrectAnswer;
// var currentIncorrectAnswers;

// var questionOne = {
//     question: "3 + 8 =",
//     answerA: "2",
//     answerB: "13",
//     answerC: "11",
//     answerD: "7"
// }

var arrayOfQuestions = [
    {
        question: "This is question 1",
        choices: ["choice 1", "choice 2", "choice 3"],
        correct: "choice 1"
    },
    {
        question: "This is question 2",
        choices: ["choice 1", "choice 2", "choice 3", "choice 4"],
        correct: "choice 2"
    },
    {
        question: "This is question 3",
        choices: ["choice 1", "choice 2", "choice 3"],
        correct: "choice 3"
    }
]

var timer;
var timeLeft = 60;

var totalScore = 0;
var initials;

var questionIndex = 0

startButton.addEventListener("click", function (event) {
    //make the start button disappear        event.target.setAttribute()

    // startButton.classList.add('hide')
    startButton.setAttribute('class', 'hide')
    renderQuestion()
    startTimer()
})

function renderQuestion() {
    questionContainer.textContent = ""
    answerContainer.textContent = ""

    if (questionIndex >= arrayOfQuestions.length) {
        return
    }

    var questionEl = document.createElement("h1")
    questionEl.setAttribute('class', 'question')
    questionEl.textContent = arrayOfQuestions[questionIndex].question

    for (var i = 0; i < arrayOfQuestions[questionIndex].choices.length; i++) {
        var choicesEl = document.createElement('button')
        choicesEl.textContent = arrayOfQuestions[questionIndex].choices[i]

        answerContainer.append(choicesEl)

        choicesEl.addEventListener('click', function (event) {
            if (event.target.textContent === arrayOfQuestions[questionIndex].correct) {
                console.log('correct')
                totalScore += 10
            } else {
                console.log('incorrect')
                timeLeft -= 10
            }
            questionIndex++
            renderQuestion()
        })
    }

    questionContainer.append(questionEl)
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



//TODO: add a submit button


function endQuiz() {
    //clear the screen
    //create the elements needed for the Highscores screen
    //document.createElement("button")       this will be the submit button
    console.log('end of quiz')

    mainContainer.textContent = ''

    // create an input and a button
    var input = document.createElement('input')
    input.setAttribute('placeholder', 'Name')
    
    var btn = document.createElement('button')
    btn.textContent = "Submit"
    
    // append them to main container
    mainContainer.append(input, btn)

    // add event listener to this button
    btn.addEventListener('click', function() {
        // get the value of the input and the totalscore var and put them into an object
        var userData = {
            name: input.value,
            score: totalScore
        }

        // save it to local storage
        var storage = JSON.parse(localStorage.getItem('quizScores'))
        if (storage === null) {
            storage = []
        }

        storage.push(userData)
        localStorage.setItem('quizScores', JSON.stringify(storage))
        window.location.href = 'highscore.html'
    })



    saveScore();
}

function startTimer() {
    timer = setInterval(function () {
        if (timeLeft <= 0 || questionIndex >= arrayOfQuestions.length) {        //might need to do timeLeft <= 0 because of answeredIncorrect()
            clearInterval(timer);
            endQuiz();
        }
        else {
            timeLeft--;
            document.getElementsByClassName("time-clock")[0].textContent = "Time: " + timeLeft;
        }
    }, 1000)
}



//progresses quiz to the next question
//check to see if there is a next question
function goToNextQuestion() {
    if (numOfQuestions > 0) {
        numOfQuestions--;

        //use if, elif, else to check what question I am on
        if (currentQuestion === arrayOfQuestions[0]) {
            //go to question 2
        }
        else if (currentQuestion === arrayOfQuestions[1]) {
            //go to question 3
        }
        else {
            //go to question 4
        }
    }

    else {
        endQuiz();
    }
}

//when a correct answer is selected, add to the score
function answeredCorrect() {
    totalScore += 25;
}

//when an incorrect answer is given, subtract ten seconds
function answeredIncorrect() {
    timeLeft = timeLeft - 10;
}

//when the quiz ends, user enters initials and saves them to a list of previous scores
function saveScore() {

}
