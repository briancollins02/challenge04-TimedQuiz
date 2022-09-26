const question = document.querySelector('#question-render');
const options = Array.from(document.querySelectorAll('.answer-choice'));
const timerEl = document.getElementById('ui-time-remaining');
const progress = document.querySelector('#ui-question--progress');



const questions = [
    {
        q: 'the answer to this question is "hi"',
        choices: ['a. howdy', 'b. hey', 'c. hi', 'd.hehe'],
        answer: 'c. hi'
    },
    {
        q: 'the answer to this question is "no"',
        choices: ['a. nawr', 'b. nope', 'c. nada', 'd.no'],
        answer: 'd. no'
    },
    {
        q: 'the answer to this question is "growl"',
        choices: ['a. growl', 'b. bark', 'c. ribbit', 'd.meow'],
        answer: 'a. growl'
    },
    {
        q: 'the answer to this question is "thunk"',
        choices: ['a. think', 'b. thunk', 'c. thank', 'd.thonk'],
        answer: 'b. thunk'
    }
]

function countdown() {
    var timeLeft = 29;
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
        return window.location.assign('index.html')
      }
    }, 1000);
  }

countdown();