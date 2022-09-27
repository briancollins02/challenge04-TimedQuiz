const questionEl = document.getElementById('question-render');
const timerEl = document.getElementById('ui-time-remaining');
const pointsEl = document.getElementById('ui-question-progress');
const buttons = document.querySelectorAll('.answer-choice');
const quizLengthEl = document.getElementById('total-questions');
const saveScoreEl = document.getElementById('submit-button');
var initialInput = document.getElementById('initialsEl');

const choiceA = document.getElementById('a');
const choiceB = document.getElementById('b');
const choiceC = document.getElementById('c');
const choiceD = document.getElementById('d');

var timeLeft = 4;
var score = 0;
var currentQuestion;
const questions = [
    {
        q: 'the answer to this question is "hi"',
        choices: ['a. howdy', 'b. hey', 'c. hi', 'd.hehe'],
        answer: 'c'
    },
    {
        q: 'the answer to this question is "no"',
        choices: ['a. nawr', 'b. nope', 'c. nada', 'd.no'],
        answer: 'd'
    },
    {
        q: 'the answer to this question is "growl"',
        choices: ['a. growl', 'b. bark', 'c. ribbit', 'd.meow'],
        answer: 'a'
    },
    {
        q: 'the answer to this question is "thunk"',
        choices: ['a. think', 'b. thunk', 'c. thank', 'd.thonk'],
        answer: 'b'
    }
]
quizLengthEl.innerText = '/' + questions.length

// Define Functions

function countdown() {
    var timeInterval = setInterval(function () {
      if (timeLeft > 1) {
        timerEl.textContent = timeLeft + ' seconds remaining';
        timeLeft--;
      } else if (timeLeft === 1) {
        timerEl.textContent = timeLeft + ' second remaining';
        timeLeft--;
      } else {
        timerEl.textContent = '';
        clearInterval(timeInterval);
        endGame()
      }
    }, 1000);
}

var arraySelection = -1

function getQuestion() {
    //check if there are any more questions
 
    if (arraySelection > questions.length-2) {
        endGame();
    }
    // go to next question
    arraySelection++
    var currentQuestion = questions[arraySelection];
    questionEl.textContent = currentQuestion.q;
    choiceA.textContent = currentQuestion.choices[0];
    choiceB.textContent = currentQuestion.choices[1];
    choiceC.textContent = currentQuestion.choices[2];
    choiceD.textContent = currentQuestion.choices[3];
    console.log(arraySelection);
}

// check button selection and add score
document.querySelectorAll('button').forEach(occurence => {
    occurence.addEventListener('click', (e) => {
        let elementId = e.target.id;
        if (elementId !== '') {
            console.log(elementId, ' was clicked');
            console.log(questions[arraySelection].answer, 'is the correct answer')
            if (elementId == questions[arraySelection].answer){
                console.log('correct!');
                score++
                pointsEl.textContent = score + ' correct/' + questions.length;
                correct();
            } else {
                console.log('wrong!');
                timeLeft -=5;
                incorrect()
            }
        }
        //TODO insert a function that plays a confirmation animation
        //wait for user feedback to play and then move to the next question
        setTimeout(getQuestion, 1000); 
    })
})

//correct and incorrect user feedback
function correct() {
    console.log('correct!');
        pointsEl.classList.add('flash-green');
    setTimeout(function() {
        pointsEl.classList.remove('flash-green');
    },2000)
}

function incorrect() {
    console.log('incorrect!');
        timerEl.classList.add('flash-red');
    setTimeout(function() {
        timerEl.classList.remove('flash-red');
    },2000)
}



// end game if time up or out of questions
function endGame() {
    document.getElementById('end-screen').classList.add('show');
    document.getElementById('end-screen').classList.remove('hide');
    endScore.textContent = score;
    totalQuestions.textContent = questions.length;
}

// End Screen Functionality
const endScore = document.getElementById('total-scoreEl');
const totalQuestions = document.getElementById('total-questionsEl') ;

function saveScore() {
    console.log('submitted!')
    // create user object from submission
    var currentScore = {
        pointTotal: score,
        initials: initialInput.value.trim()
    };

    //send submission to local storage
    localStorage.setItem("high-scores", JSON.stringify(currentScore));
}

// Call Functions
getQuestion();
countdown();


console.log(questions.length)