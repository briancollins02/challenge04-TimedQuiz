const questionEl = document.getElementById('question-render');
const timerEl = document.getElementById('ui-time-remaining');
const pointsEl = document.getElementById('ui-question-progress');
const quizLengthEl = document.getElementById('total-questions');
const highScoreEl = document.getElementById('high-scoreEl');
var initialInput = document.getElementById('initialsEl');

const endScore = document.getElementById('total-scoreEl');
const totalQuestions = document.getElementById('total-questionsEl');

const choiceA = document.getElementById('a');
const choiceB = document.getElementById('b');
const choiceC = document.getElementById('c');
const choiceD = document.getElementById('d');

var canAnswer = false;

var savedHighScore = JSON.parse(localStorage.getItem('high-score')) || 0;
var scoreDisplay = savedHighScore.pointTotal

console.log(savedHighScore)
console.log(scoreDisplay)

console.log('old high-score',scoreDisplay)


var timeLeft = 29;
var score = 0;
var currentQuestion;
const questions = [
    {
        q: 'When was "The Titanic" released??',
        choices: ['a. 1990', 'b. 2000', 'c. 1997', 'd. 1995'],
        answer: 'c'
    },
    {
        q: 'What is the highest grossing movie of all time?',
        choices: ['a. Avengers: Endgame', 'b. Star Wars: Episode VII', 'c. The Lion King', 'd. Avatar'],
        answer: 'd'
    },
    {
        q: 'how many films hold 11 Academy Award winds?',
        choices: ['a. 3', 'b. 1', 'c. 5', 'd. 7'],
        answer: 'a'
    },
    {
        q: 'What was the first "fantasy" movie to win best picture',
        choices: ['a. The Return of the King', 'b. Harry Potter', 'c. Fellowship of the Ring', 'd. Willy Wonka'],
        answer: 'a'
    },
    {
        q: 'Which one of these movies holds a 100 on metacritic?',
        choices: ["a. Pan's Labyrinth", 'b. Moonlight', 'c. Psycho', 'd. The GodFather'],
        answer: 'd'
    },
    {
        q: 'What year did the first Academy Awards take place?',
        choices: ['a. 1929', 'b. 1970', 'c. 1956', 'd. 1922'],
        answer: 'a'
    },
    {
        q: 'What actor is widely blamed for the precense of celebrity voice actors in animated movies?',
        choices: ['a. Danny Devito', 'b. Robin Williams', 'c. Billy Idol', 'd. Tom Hanks'],
        answer: 'b'
    },
    {
        q: 'What was the first Feature Film John Williams composed for?',
        choices: ['a. Star Wars', 'b. Daddy-O', 'c. Jaws', 'd. The Killers'],
        answer: 'b'
    },
    {
        q: 'This low-budget horror director was given free reign to Lord of the Rings',
        choices: ['a. Stephen Spielberg', 'b. Geroge Lucas', 'c. Peter Jackson', 'd. Guillermo del Torro'],
        answer: 'c'
    },
    {
        q: 'When was the first Star Wars movie released?',
        choices: ['a. 1980', 'b. 1983', 'c. 1976', 'd. 1977'],
        answer: 'd'
    }
]
// Total numer of Questions
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
        timerEl.textContent = ' 0 seconds remaining';
        clearInterval(timeInterval);
        endGame()
      }
    }, 1000);
}

// start out at -1 so get question gets us to index: 0
var arraySelection = -1

// Go to next question
function getQuestion() {
    // enable answering
    canAnswer = true;
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
}

// check button selection and add score
document.querySelectorAll('button').forEach(occurence => {
        occurence.addEventListener('click', (e) => {
            if (canAnswer == true) {
                let elementId = e.target.id;
                console.log(canAnswer)
                if (elementId !== '') {
                    if (elementId == questions[arraySelection].answer){
                        score++
                        pointsEl.textContent = score + ' correct/' + questions.length;
                        correct();
                    } else {
                        timeLeft -=5;
                        incorrect()
                    }
                }
            } else { //stop the function from working while canAnswer=false
                return
            }
            //TODO insert a function that plays a confirmation animation
            //wait for user feedback to play and then move to the next question
        setTimeout(getQuestion, 250); 
    })
})

//correct and incorrect user feedback
function correct() {
        canAnswer = false;
        pointsEl.classList.add('flash-green');
    setTimeout(function() {
        pointsEl.classList.remove('flash-green');
    },2000)
}

function incorrect() {
        canAnswer = false;
        timerEl.classList.add('flash-red');
    setTimeout(function() {
        timerEl.classList.remove('flash-red');
    },2000)
}



// end game if time up or out of questions
function endGame() {
    endScore.textContent = score;
    totalQuestions.textContent = questions.length;
    console.log('scoreDisplay',scoreDisplay);
    document.getElementById('end-screen').classList.add('show');
    document.getElementById('end-screen').classList.remove('hide');
    console.log('current score', score)
    if (scoreDisplay === undefined || score > savedHighScore.pointTotal) {
        console.log(savedHighScore.pointTotal)
        console.log('new high-score!')
        //Show High Score submission form
        document.getElementById('form').classList.add('show')
        document.getElementById('form').classList.remove('hide')
    } else {
        highScoreEl.textContent = 'The current High-Score is ' + scoreDisplay + ' by ' + savedHighScore.initials;
        document.getElementById('back-button').classList.add('show')
        document.getElementById('back-button').classList.remove('hide')
    }
    

   

}

// End Screen Functionality

function saveScore() {
    // create user object from submission
    var currentScore = {
        pointTotal: score,
        initials: initialInput.value.trim()
    };
    console.log(savedHighScore)
    //send submission to local storage
        localStorage.setItem("high-score", JSON.stringify(currentScore));
        savedHighScore = localStorage.getItem("high-score");
        console.log('submitted!', savedHighScore)
    return window.location.assign('index.html')
}

// Call Functions
getQuestion();
countdown();