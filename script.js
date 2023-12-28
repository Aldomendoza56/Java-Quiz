var remainingTime = document.getElementById('countdown');
var mainEl = document.getElementById('main');
var questionContainerElement = document.getElementById('question-container')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')
var submitButton = document.getElementById('submit-button');

let shuffledQuestions, currentQuestionIndex

function countdown() {
    var secondsLeft = 90;
  
    // We need to create a function to make sure our timer works
    var timer = setInterval(function () {
      // As long as the `timeLeft` is greater than 1
      if (secondsLeft > 1) {
        // Set the `textContent` of `timerEl` to show the remaining seconds
        remainingTime.textContent = secondsLeft + ' seconds left!';
        // Decrement `timeLeft` by 1
        secondsLeft--;
      } else if (secondsLeft === 1) {
        // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
        remainingTime.textContent = secondsLeft + 'seconds left!';
        secondsLeft--;
      }
      
      else {
        // Once `timeLeft` gets to 0, set `timerEl` to an empty string
        remainingTime.textContent = 'GAME OVER!!';
        // Use `clearInterval()` to stop the timer
        clearInterval(timer);
        // Call the `displayMessage()` function
      }
    }, 1000);
    document.getElementById('incorrect').addEventListener('click', function() {
      sec -= 25;
      document.getElementById('timerDisplay').innerHTML='00:'+sec;
  });
  startTimer();
  }

  countdown();


  function quizStarter() {
  questionContainerElement.classList.remove('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){
    questionElement.innerText = question.question
    answerButtonsElement.innerHTML = '';
    question.answers.forEach(answer => {
      var button = document.createElement('button')
      button.innerText = answer.text
      button.classList.add('button.correct')
      if (answer.correct) {
        button.dataset.correct = answer.correct
      }
      button.addEventListener('click', selectAnswer)
      answerButtonsElement.appendChild(button)
    })
}

function selectAnswer(e) {
  var selectedButton = e.target
  var correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    submitButton.classList.remove('hide')
  } else {
    submitButton.innerText = 'Restart'
    submitButton.classList.remove('hide')
    }
  }

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('button.correct');
  } else {
    element.classList.add('button.wrong');
    }
  }

function clearStatusClass(element) {
  element.classList.remove('button.correct')
  element.classList.remove('button.wrong')
}

var questions = [
    {
    question: 'Which one is a string?',
    answers: [
        {text: 'var name = John', correct: true},
        {text: '27', correct: false },
        {text: 'class= body', correct: false},
        {text: 'oranges', correct: false}
    ]
  }
]
document.getElementById('submit-button').addEventListener('click', quizStarter);