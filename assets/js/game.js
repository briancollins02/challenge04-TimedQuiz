const questionEl = document.getElementById('question-render');
const timerEl = document.getElementById('ui-time-remaining');
const pointsEl = document.getElementById('ui-question-progress');
const buttons = document.querySelectorAll('.answer-choice');


const choiceA = document.getElementById('a');
const choiceB = document.getElementById('b');
const choiceC = document.getElementById('c');
const choiceD = document.getElementById('d');

var timeLeft = 29;
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

// countdown();

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

getQuestion();

// end game if time up or out of questions
function endGame() {
        return window.location.assign('index.html');
}

document.querySelectorAll('button').forEach(occurence => {
    occurence.addEventListener('click', (e) => {
        let elementId = e.target.id;
        if (elementId !== '') {
            console.log(elementId, ' was clicked');
            console.log(questions[arraySelection].answer, 'is the correct answer')
            if (elementId == questions[arraySelection].answer){
                console.log('correct!');
                score++
                pointsEl.textContent = score + ' correct';

            } else {
                console.log('wrong!');
            }
        }
        //TODO insert a function that plays a confirmation animation
        //wait for user feedback to play and then move to the next question
        setTimeout(getQuestion, 1000); 
    })
})

// Sleep Function
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate= null;
    do {
        currentDate= Date.now();
    } while (currentDate - date < milliseconds);
}

console.log(questions.length)