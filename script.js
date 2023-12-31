//variables need to go on the top of the page
// var timeRemaining = document.getElementById('countdown')
// var mainEl = document.getElementById ('main')
// var questionContainerEl = document.getElementById('question-container')
// var questionElement = document.getElementById('answer-buttons')





// function countdown() {
//   var timeLeft = 90;

//   var timeInterval = setInterval( function() {
//     if(timeLeft > 1) {
//       timeRemaining.textContent = timeLeft + ' seconds remaining';
//       timeLeft--;
//     } else if (timeLeft ===1) {
//       timeRemaining.timeContext = timeLeft + 'seconds Remaining';
//       timeLeft--;
//     } else {
//       timeRemaining.textcontext = 'Game Over!';
//       clearInterval(timeInterval);
//       displayMessage();
//     }
//   }, 1000);
// }
var remainingTime = document.getElementById('countdown');
var mainEl = document.getElementById('main');
var questionContainerElement = document.getElementById('question-container')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')
var submitButton = document.getElementById('submit-button');
//var startButton = document.querySelector(".start-button");

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
  }
    
    
  countdown();

// This starts the quiz//
  function quizStarter() {
  questionContainerElement.classList.remove('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}
//this allows the user to go to the next question//
function setNextQuestion() {
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

// this function is plugging the question into the webpage
function showQuestion(question) {
  questionElement.innerText = question.question;
  answerButtonsElement.innerHTML = '';
  question.answers.forEach(answer => {
      var button = document.createElement('button');
      button.innerText = answer.text;
      button.classList.add(answer.correct ? 'button.correct' : 'button.wrong');
      button.dataset.correct = answer.correct;
      button.addEventListener('click', selectAnswer);
      answerButtonsElement.appendChild(button);
  });
}

function selectAnswer(e) {
  var selectedButton = e.target
  var correct = selectedButton.dataset.correct;
  setClassStatus(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
      setClassStatus(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
      submitButton.classList.remove('hide');
  } else {
      submitButton.innerText = 'Restart';
      submitButton.classList.remove('hide');
  }
}

function setClassStatus(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}
  //element.classList.add(correct ? 'button.correct' : 'button.wrong');



function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

var questions = [
    {
    question: 'Which one is a string?',
    answers: [
        {text: 'var name = John', correct: true},
        {text: '27', correct: false },
        {text: 'class= body', correct: false},
        {text: 'oranges', correct: false},
    ]
  }
  ,{
  question: 'Which one of these is true about local storage?',
  answers: [
  {text: 'local storage is a location', correct: false},
  {text: 'local storage is pizza', correct: false },
  {text: 'local storage is used to store data', correct: true},
  {text: 'local storage is confusing', correct: false}
  ]
 }
 ,{
  question: 'What is the DOM?',
  answers: [
  {text: 'A person from a the Fast and Furious', correct: false},
  {text: 'Data Outburst Meta', correct: false },
  {text: 'Donut Object Monster', correct: false},
  {text: 'Document Object Model', correct: true}
  ]
 }
 ,{
  question: 'What is the benefit of a setInterval?',
  answers: [
  {text: 'It is used to track time', correct: true},
  {text: 'It is used to time track', correct: false },
  {text: 'It does not exist', correct: false},
  {text: 'It used for time travel in the multiverse', correct: false}
  ]
 }



]
document.getElementById('submit-button').addEventListener('click', quizStarter)